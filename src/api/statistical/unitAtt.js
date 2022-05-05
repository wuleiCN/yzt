import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/statisticalReport/consAttendance',
    method: 'post',
    data
  })
}
