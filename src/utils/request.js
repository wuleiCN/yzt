import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 发版只要更改request.js和request-zhgd文件的变量env

const host = window.location.hostname

const STAGE_API = ['http://192.168.1.176/yzt-provider', 'http://yzt.yztzn.com/yzt-provider'] // 测试环境
const PRO_API = ['//' + host + '/yzt-provider', window.location.origin] // 线上环境
const CS_PRO_API = '//' + window.location.hostname + '/yzt-cs' // cs线上环境
// const CS_DEV_API = 'http://192.168.1.176/yzt-cs' // cs测试环境
const env = false
// 整体接口变量
// const getEnvValue = env ? STAGE_API[0] : PRO_API[0]
const getEnvValue = env ? PRO_API[0] : STAGE_API[1]
// 本地测试环境
// const getEnvValue = env ? 'https://192.168.1.125' : PRO_API[0]
// const getEnvValue = env ? `${window.location.origin}/yzt-provider` : PRO_API[0]
// 考试二维码变量
const erweimaValue = env ? STAGE_API[1] : PRO_API[1]
const CsGetEnvValue = env ? STAGE_API[0] : CS_PRO_API
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

const service = axios.create({
  baseURL: getEnvValue,
  timeout: 30000 // request timeout   网络波动会出现ERR弹框
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
      if (res.code === 1234) { // 需要手机号验证
        return res
      }
      if (res.code === 1002) {
        return res
      }
      if (res.code === 9909) { // 缺少参数不提示
        return
      }
      if (res.code === 9999) { // 该人员已存在项目中
        return res
      }
      if (res.code === 6009) { // 该该设备号已经存在！
        return res
      }
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
    // https://www.cnblogs.com/zhouyangla/p/8757149.html
    const config = error.config
    console.log('err', config)
    if (!config || !config.retry) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    config.__retryCount += 1
    const backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve()
      }, config.retryDelay || 1)
    })
    return backoff.then(function() {
      return axios(config)
    })
  }
)
service.baseUrl = (actionName) => {
  return `${getEnvValue}` + actionName
}
service.CsBaseUrl = (actionName) => {
  return `${CsGetEnvValue}` + actionName
}
service.staticUrl = (actionName) => {
  return actionName
}
service.erweimaUrl = (actionName) => {
  return erweimaValue + actionName
  // return 'http://192.168.1.176' + actionName // 测试二维码地址
  // return 'http://192.168.1.115:81' + actionName // 开发二维码地址
  // return 'http://yzt.yztzn.com' + actionName // 正式二维码地址
}
export default service
