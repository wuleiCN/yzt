import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/blackList/list',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/blackList/delete',
    method: 'post',
    data
  })
}
export function revoke(data) {
  return request({
    url: '/blackList/revoke',
    method: 'post',
    data
  })
}
