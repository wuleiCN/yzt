import request from '@/utils/request'

export function getMataierKC(data) {
  return request({
    url: '/materialStock/mataierKC',
    method: 'post',
    data
  })
}
export function getMataierStockView(data) {
  return request({
    url: '/materialStock/mataierStockView',
    method: 'post',
    data
  })
}
export function getStockInfo(data) {
  return request({
    url: '/materialStock/stockInfo',
    method: 'post',
    data
  })
}
export function getWarStock(data) {
  return request({
    url: '/materialStock/getWarStock',
    method: 'post',
    data
  })
}
