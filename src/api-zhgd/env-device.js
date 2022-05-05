import request from '@/utils/request-zhgd'

export function getList(data) {
  return request({
    url: '/dustEmission/getDustEmissionList',
    method: 'post',
    data
  })
}
export function save(data) {
  return request({
    url: '/dustEmission/saveDustEmission',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/dustEmission/updateDustEmissionById',
    method: 'post',
    data
  })
}
export function del(params) {
  return request({
    url: '/dustEmission/deleteDustEmissionById',
    method: 'get',
    params
  })
}
