import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getConfig } from './httpConfig'
const prefix = getConfig(true)
class HttpRequest {
  constructor(baseURL = '') {
    this.defaultConfig = { // 默认配置
      baseURL: baseURL === 'zhgd' ? prefix.getEnvZhgdValue : prefix.getEnvValue,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      timeout: 30000, // 请求超时时间
      isErrorHandle: false // 是否开启全局错误响应提示，默认关闭
    }
  }

  createAxiosInstance(options) {
    const axiosInstance = axios.create()
    // 默认配置和用户自定义配置合并
    const newOptions = this.mergeOptions(this.defaultConfig, options)
    // 调用拦截器
    this.interceptors(axiosInstance)
    axiosInstance.baseUrl = (actionName) => {
      return `${prefix.getEnvValue}` + actionName
    }
    axiosInstance.zhgdbaseUrl = (actionName) => {
      return `${prefix.getEnvZhgdValue}` + actionName
    }
    axiosInstance.CsBaseUrl = (actionName) => {
      return `${prefix.CsGetEnvValue}` + actionName
    }
    axiosInstance.staticUrl = (actionName) => {
      return actionName
    }
    axiosInstance.socketUrl = (path) => {
      return `${prefix.soketEnvZhgdValue}` + path
    }
    axiosInstance.erweimaUrl = (actionName) => {
      return prefix.erweimaValue + actionName
    }
    // 返回实例
    return axiosInstance(newOptions)
  }

  mergeOptions(source, target) {
    if (typeof target !== 'object' || target == null) {
      return source
    }
    return Object.assign(source, target)
  }

  interceptors(instance) {
    // 请求拦截器
    instance.interceptors.request.use(
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

    // 响应拦截器
    instance.interceptors.response.use(
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
  }
}

export default HttpRequest
