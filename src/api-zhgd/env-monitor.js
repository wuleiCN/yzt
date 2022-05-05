import request from '@/utils/request-zhgd'

export function getDustEmissionList(data) {
  return request({
    url: '/dustEmission/getDustEmissionList',
    method: 'post',
    data
  })
}
export function findDustEmissionRecordList(data) {
  return request({
    url: '/emissionRecord/findDustEmissionRecordList',
    method: 'post',
    data
  })
}
export function findNewDustRecordById(params) {
  return request({
    url: '/emissionRecord/findNewDustRecordById',
    method: 'get',
    params
  })
}
export function envProList(params) {
  return request({
    url: '/dustEmission/screenPro',
    method: 'get',
    params
  })
}
