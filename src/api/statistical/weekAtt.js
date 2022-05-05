import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/statisticalReport/inOutWeekReport',
    method: 'post',
    data
  })
}
