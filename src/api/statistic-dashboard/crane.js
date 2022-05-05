import request from '@/utils/request-zhgd'

// 1 塔吊设备
export function screenPro(params) {
  return request({
    url: '/crane/screenPro',
    method: 'get',
    params
  })
}
// 2实时数据
export function findNewRecord(params) {
  return request({
    url: '/craneRecord/findNewRecord',
    method: 'get',
    params
  })
}
// 3 实时明细
export function getWarnList(params) {
  return request({
    url: '/craneRecord/getWarnList',
    method: 'get',
    params
  })
}
// 大屏塔机数据统计(POST)
export function craneSta(data) {
  return request({
    url: '/craneRecord/craneSta',
    method: 'post',
    data
  })
}

