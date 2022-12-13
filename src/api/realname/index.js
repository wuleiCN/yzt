import request from '@/utils/request'

export function getAttendanceStatistics(data) {
  return request({
    url: '/salaryStar/attendanceStatistics',
    method: 'post',
    data
  })
}

export function getWeeklyStatistics(data) {
  return request({
    url: '/salaryStar/weeklyStatistics',
    method: 'post',
    data
  })
}

export function getProjectAttInfo(data) {
  return request({
    url: '/salaryStar/projectAttInfo',
    method: 'post',
    data
  })
}

export function getEpervenInfo(data) {
  return request({
    url: '/salaryStar/epervenInfo',
    method: 'post',
    data
  })
}

export function getCompyName(data) {
  return request({
    url: '/salaryStar/getCompyName',
    method: 'post',
    data
  })
}
