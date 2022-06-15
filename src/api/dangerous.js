import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/qualityControl/list',
    method: 'post',
    data
  })
}
export function saverOrUpdate(data) {
  return request({
    url: '/dangerousLargeProject/saverOrUpdate',
    method: 'post',
    data
  })
}

