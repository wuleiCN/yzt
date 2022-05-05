import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/statisticalReport/workerRoster',
    method: 'post',
    data
  })
}
