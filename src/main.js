import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import httpRequest from '@/utils/request'
import zhgdRequest from '@/utils/request-zhgd'
// import request1 from '@/utils/httpRequest'
import '@/styles/index.scss' // global css
import VueAMap from 'vue-amap' // 高德地图
import dataV from '@jiaminghi/data-view' // 大屏展示组件
import App from './App'
import store from './store'
import router from './router'
import { directive } from './utils/directive'
import { filter } from './utils/filter'
import '../public/static/ueditor/ueditor.config.js'
import '../public/static/ueditor/ueditor.all.js'
import '../public/static/ueditor/lang/zh-cn/zh-cn.js'
import ECharts from 'vue-echarts'
// import vueEsign from 'vue-esign'
// import Clipboard from 'v-clipboard'
import plugin from './utils/plugin'
import dataConver from './utils/dataConver'
// console.log(Clipboard)
Vue.use(plugin)
// Vue.use(vueEsign)
// import '../public/static/ueditor/themes/default/css/ueditor.css'
// import '../public/static/ueditor/ueditor.parse.js'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 后台要求
if (window.location.origin === 'http://yzt.yztzn.com') {
  window.location.replace('https://yzt.yztzn.com')
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$httpZhgd = zhgdRequest // ajax请求方法
Vue.prototype.$dataConver = dataConver.dataConver // 小数点计算
// eslint-disable-next-line new-cap
// const xxx = new request1({ baseURL: 'zhgd' })
// console.log(request1.dsad)
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, { size: 'small' })
Vue.use(VueAMap)
Vue.component('chart', ECharts)
// Vue.filter('createTime', () => {
//   return '111'
// })
Vue.use(dataV)
Vue.config.productionTip = false
directive()
filter()
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
