import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/materialInHouse/list',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/materialInHouse/saveOrUpdate',
    method: 'post',
    data
  })
}
export function deleteById(data) {
  return request({
    url: '/materialInHouse/delete',
    method: 'post',
    data
  })
}
