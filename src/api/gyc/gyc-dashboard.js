import request from '@/utils/request'

// 项目基本信息
export function proDetail(data) {
  return request({
    url: '/gycBigScreen/proDetail',
    method: 'post',
    data
  })
}
// 参建统计
export function consList(data) {
  return request({
    url: '/gycBigScreen/consList',
    method: 'post',
    data
  })
}
// 房间统计
export function roomList(data) {
  return request({
    url: '/gycBigScreen/roomList',
    method: 'post',
    data
  })
}
// 年龄段统计（饼图）
export function ageStatistics(data) {
  return request({
    url: '/gycBigScreen/ageStatistics',
    method: 'post',
    data
  })
}
// 性别统计
export function sexStatistics(data) {
  return request({
    url: '/gycBigScreen/sexStatistics',
    method: 'post',
    data
  })
}
// 最新打卡
export function newAttendance(data) {
  return request({
    url: '/gycBigScreen/newAttendance',
    method: 'post',
    data
  })
}
