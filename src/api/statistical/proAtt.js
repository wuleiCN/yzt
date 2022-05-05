import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/statisticalReport/projectAttendance',
    method: 'post',
    data
  })
}
