import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/statisticalReport/teamAttendanceSummary',
    method: 'post',
    data
  })
}
export function teamAttendance(data) {
  return request({
    url: '/statisticalReport/teamAttendance',
    method: 'post',
    data
  })
}
