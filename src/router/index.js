import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
function getViews(path) {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('@/views' + path + '.vue'))
    })
  }
}

export const golobalRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/datav',
    component: () => import('@/views/datav/index'),
    hidden: true
  },
  {
    path: '/realname',
    component: () => import('@/views/realname/index'),
    hidden: true
  },
  {
    path: '/learn',
    component: () => import('@/views/learn/index'),
    hidden: true
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/ic-worker',
    component: () => import('@/views/ic-worker/index'),
    meta: { title: '证卡信息', icon: 'ic-worker' },
    hidden: true
  },

  {
    path: '/exam',
    component: () => import('@/views/exam/index'),
    meta: { title: '在线考试', icon: 'exam' },
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
  // { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: golobalRoutes
  // routes: getmenuList()
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export function getmenuList() {
  const gPath = ['/ic-worker', '/exam', '/learn', '/datav', '/realname'] // 这是独立页面,没有layout布局
  const hPath = [] // 隐藏,有layout布局
  const topShowPath = ['/dashboard', '/company', '/construction', '/workersLib']
  var list = JSON.parse(sessionStorage.getItem('result')) && JSON.parse(sessionStorage.getItem('result')).resources ? JSON.parse(sessionStorage.getItem('result')).resources : []
  // 数组过滤空值（undefined、null、""、0、false、NaN）
  // console.log('list1', list)
  list = list.filter(Boolean).filter(item => !item.alias).sort((a, b) => a.sort - b.sort)
  // console.log('list2', list)
  function convert(list) {
    const map = list.reduce((acc, item) => {
      acc[item.id] = {
        ...item,
        meta: {
          title: item.name,
          icon: item.iconCls
        },
        path: item.rules
        // name: item.name + item.rules
      }
      return acc
    }, {})
    const result = []
    for (const key in map) {
      const item = map[key]
      if (!item.parentId) {
        item.hidden = gPath.includes(item.rules) || hPath.includes(item.rules)
        item.component = gPath.includes(item.rules) ? getViews(item.rules + '/index') : () => import('@/layout')
        if (topShowPath.includes(item.rules)) {
          item.isTop = true
          item.children = item.children || [
            {
              path: 'index',
              component: getViews(item.rules + '/index'),
              name: item.name + '/index',
              meta: { title: item.name, sysType: item.sysType, icon: item.iconCls }
            }
          ]
        } else {
          item.children = item.children || []
        }
        item.redirect = item.rules + '/index'
        result.push(item)
      } else {
        const parent = map[item.parentId]
        if (parent) {
          parent.children = parent.children || []
          item.component = getViews(item.rules)
          item.name1 = item.name
          item.name = item.name + item.rules // 为了name不重名
          parent.children.push(item)
        }
      }
    }
    return result
  }
  var result = convert(list)
  return [...result, ...golobalRoutes]
}
router.getmenuList = function() {
  return getmenuList()
}
router.pmit = function() {
  let pmitList = []
  pmitList = JSON.parse(sessionStorage.getItem('result')) && JSON.parse(sessionStorage.getItem('result')).resources ? JSON.parse(sessionStorage.getItem('result')).resources : []
  pmitList = pmitList.filter(Boolean) // 数组过滤空值（undefined、null、""、0、false、NaN）
  return pmitList.filter(item => item.alias)
}
router.selfaddRoutes = function(params) {
  router.addRoutes(params)
}
export default router
