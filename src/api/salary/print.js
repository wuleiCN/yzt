import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/salary/printList',
    method: 'post',
    data
  })
}
