import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 发版只要更改request.js和request-zhgd文件的变量env

const host = window.location.hostname

const STAGE_API = ['http://yzt.yztzn.com/yzt-zhgd', 'ws://yzt.yztzn.com/yzt-zhgd']
const PRO_API = [
  '//' + host + '/yzt-zhgd',
  window.location.origin,
  (window.location.protocol === 'http:' ? 'ws://' : 'wss://') + host + '' + '/yzt-zhgd'
] // 线上环境
const CS_PRO_API = 'https://yzt.yztzn.com/yzt-cs' // cs线上环境
// const CS_DEV_API = 'http://192.168.1.176/yzt-cs' // cs测试环境
const env = false
// 整体接口变量
// const getEnvValue = env ? STAGE_API[0] : PRO_API[0]
const getEnvValue = env ? PRO_API[0] : STAGE_API[0]
// const getEnvValue = env ? `${window.location.origin}/yzt-zhgd` : PRO_API[0]
// 本地测试环境
// const getEnvValue = env ? 'https://192.168.1.125' : PRO_API[0]
// 考试二维码变量
const erweimaValue = env ? STAGE_API[1] : PRO_API[1]
// websoket变量
const soketEnvValue = env ? PRO_API[2] : STAGE_API[1]
const CsGetEnvValue = env ? STAGE_API[0] : CS_PRO_API
const service = axios.create({
  baseURL: getEnvValue,
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 1000) {
      if (res.code === 1002) {
        return res
      }
      if (res.code === 9909) { // 缺少参数不提示
        return
      }
      if (res.code === 9999) { // 该人员已存在项目中
        return res
      }
      // 请求超时
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 9908 || res.code === 50012 || res.code === 50014) {
        // to re-login
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
service.siteEnv = () => {
  return env
}
service.baseUrl = (actionName) => {
  return `${getEnvValue}` + actionName
}
service.CsBaseUrl = (actionName) => {
  return `${CsGetEnvValue}` + actionName
}
service.staticUrl = (actionName) => {
  return actionName
}
service.socketUrl = (path) => {
  return `${soketEnvValue}` + path
}
service.erweimaUrl = (actionName) => {
  return erweimaValue + actionName
  // return 'http://192.168.1.176' + actionName // 测试二维码地址
  // return 'http://192.168.1.115:81' + actionName // 开发二维码地址
  // return 'http://yzt.yztzn.com' + actionName // 正式二维码地址
}
export default service
