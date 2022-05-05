import Vue from 'vue'
import httpRequest from '@/utils/request'
/**
 * @export 过滤器
 * 后台要求把所有以http开头的图片，替换成https开头
 */
export function filter() {
  Vue.filter('http2HttpsFilter', (value) => {
    if (value && !value.startsWith('https')) {
      return httpRequest.baseUrl(`/user/getImg?orgUrl=${value}`)
    }
    return value
  })
}
