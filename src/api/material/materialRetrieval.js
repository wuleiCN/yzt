import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/materialOutHouse/list',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/materialOutHouse/saveOrUpdate',
    method: 'post',
    data
  })
}
export function deleteById(data) {
  return request({
    url: '/materialOutHouse/delete',
    method: 'post',
    data
  })
}
