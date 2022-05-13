import request from '@/utils/request'

export function getTodayAttendance(data) {
  return request({
    url: '/projectKanban/todayAttendance',
    method: 'post',
    data
  })
}

export function getWorkTypeProportion(data) {
  return request({
    url: '/projectKanban/workTypeProportion',
    method: 'post',
    data
  })
}
export function getEpidemicConsAttendance(data) {
  return request({
    url: '/epidemic/consAttendance',
    method: 'post',
    data
  })
}
export function getConsAttendance(data) {
  return request({
    url: '/projectKanban/consAttendance',
    method: 'post',
    data
  })
}
export function getWeekAttendance(data) {
  return request({
    url: '/projectKanban/weekAttendance',
    method: 'post',
    data
  })
}
export function getNewestAttendance(data) {
  return request({
    url: '/projectKanban/newestAttendance',
    method: 'post',
    data
  })
}
export function getAttendanceDynamic(data) {
  return request({
    url: '/projectKanban/attendanceDynamic',
    method: 'post',
    data
  })
}
export function getEpidemicTrafficRecord(data) {
  return request({
    url: '/epidemic/trafficRecord',
    method: 'post',
    data
  })
}
export function weekHeaCode(data) {
  return request({
    url: '/epidemic/weekHeaCode',
    method: 'post',
    data
  })
}
export function getFYNumber(data) {
  return request({
    url: '/epidemic/getFYNumber',
    method: 'post',
    data
  })
}
export function getNewestAttendanceAndEpidemic(data) {
  return request({
    url: '/epidemic/newestAttendanceAndEpidemic',
    method: 'post',
    data
  })
}
export function getAttlist(data) {
  return request({
    url: '/epidemic/attlist',
    method: 'post',
    data
  })
}
export function getLocalCodeList(data) {
  return request({
    url: 'epidemic/localCodeList',
    method: 'post',
    data
  })
}
