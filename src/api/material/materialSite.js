import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/materialSite/list',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/materialSite/saveOrUpdate',
    method: 'post',
    data
  })
}
export function deleteById(data) {
  return request({
    url: '/materialSite/delete',
    method: 'post',
    data
  })
}
