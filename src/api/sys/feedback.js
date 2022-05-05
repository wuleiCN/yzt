import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/feedback/list',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/feedback/deleteFeedBackByIds',
    method: 'post',
    data
  })
}
