import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/materialParameter/list',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/materialParameter/saveOrUpdate',
    method: 'post',
    data
  })
}
export function deleteById(data) {
  return request({
    url: '/materialParameter/delete',
    method: 'post',
    data
  })
}
