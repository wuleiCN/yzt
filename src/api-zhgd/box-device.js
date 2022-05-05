import request from '@/utils/request-zhgd'

export function getList(data) {
  return request({
    url: '/electricityBox/findElectrictityBoxList',
    method: 'post',
    data
  })
}
export function save(data) {
  return request({
    url: '/electricityBox/saveElectricityBox',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/electricityBox/updateElectricityBoxById',
    method: 'post',
    data
  })
}
export function del(params) {
  return request({
    url: '/electricityBox/deleteElectricityBoxById',
    method: 'get',
    params
  })
}
