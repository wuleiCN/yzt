import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/materialStock/list',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/materialStock/saveOrUpdate',
    method: 'post',
    data
  })
}
export function deleteById(data) {
  return request({
    url: '/materialStock/delete',
    method: 'post',
    data
  })
}
