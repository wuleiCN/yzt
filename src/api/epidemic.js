import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/attendanceRecord/healthList',
    method: 'post',
    data
  })
}
