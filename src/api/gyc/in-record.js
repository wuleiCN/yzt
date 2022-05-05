import request from '@/utils/request'

export function recordList(data) {
  return request({
    url: '/gycStayRecord/list',
    method: 'post',
    data
  })
}
export function inOutRecordList(data) {
  return request({
    url: '/gycAtRecord/list',
    method: 'post',
    data
  })
}
export function statistics(data) {
  return request({
    url: '/gycAtRecord/statistics',
    method: 'post',
    data
  })
}
export function statisticsEmp(data) {
  return request({
    url: '/gycAtRecord/statisticsEmp',
    method: 'post',
    data
  })
}
