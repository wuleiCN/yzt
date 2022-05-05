import { login, logout, smsLogin } from '@/api/sys/user'
import { Message } from 'element-ui'
import { getToken, setToken, removeToken, removeResult } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  orgId: '',
  loginInfo: {},
  avatar: '',
  introduction: '',
  roles: [],
  menu: [],
  roleList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ORGID: (state, orgId) => {
    state.orgId = orgId
  },
  SET_RESULT: (state, loginInfo) => {
    state.loginInfo = loginInfo
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLELIST: (state, roleList) => {
    state.roleList = roleList
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      login({ ...userInfo }).then(response => {
        const { result, code } = response
        if (code === 1000) {
          state.result = result
          commit('SET_TOKEN', result.token)
          setToken(result.token)
          sessionStorage.setItem('result', JSON.stringify(result))
          router.push({ path: '/dashboard' })
          resolve()
        } else if (code === 1234) {
          resolve(response)
          Message({
            message: response.message,
            type: 'error',
            duration: 1000
          })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  phonelogin({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      smsLogin({ ...userInfo }).then(response => {
        const { result } = response
        state.result = result
        commit('SET_TOKEN', result.token)
        setToken(result.token)
        sessionStorage.setItem('result', JSON.stringify(result))
        router.push({ path: '/dashboard' })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve) => {
      commit('SET_ROLES', 'admin')
      commit('SET_RESULT', JSON.parse(sessionStorage.getItem('result')))
      // commit('SET_AVATAR', state.result.avatar)
      // commit('SET_INTRODUCTION', state.result.introduction)
      resolve()
    })
  },
  // 存储颗粒话权限
  setroles({ commit }, roleList) {
    commit('SET_ROLELIST', roleList)
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeResult()
        sessionStorage.removeItem('result')
        sessionStorage.removeItem('flag')
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      sessionStorage.removeItem('result')
      resolve()
    })
  },

  setMenu({ commit }, menu) {
    return new Promise(resolve => {
      commit('SET_MENU', menu)
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
