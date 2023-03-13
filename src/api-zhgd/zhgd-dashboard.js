import request from '@/utils/request-zhgd'
// 大屏摄像头在线总数统计(POST)
export function videoSta(data) {
  return request({
    url: '/video/videoSta',
    method: 'post',
    data
  })
}
// 大屏扬尘最新单条数据(POST)
export function dustSta(data) {
  return request({
    url: '/emissionRecord/dustSta',
    method: 'post',
    data
  })
}
// 大屏塔机数据统计(POST)
export function craneSta(data) {
  return request({
    url: '/craneRecord/craneSta',
    method: 'post',
    data
  })
}
// 大屏电箱数据统计(POST)
export function electSta(data) {
  return request({
    url: '/electricityBoxRecord/electSta',
    method: 'post',
    data
  })
}
// 大屏车牌数据统计(POST)
export function vehicleSta(data) {
  return request({
    url: '/vehicleRecord/vehicleSta',
    method: 'post',
    data
  })
}
// 大屏升降机数据统计(POST)
export function elevatorSta(data) {
  return request({
    url: '/elevator/elevatorSta',
    method: 'post',
    data
  })
}
// 选择项目
export function pList(params) {
  return request({
    url: '/project/pList',
    method: 'get',
    params
  })
}

// 首页轮播/视频列表(POST)
export function carouselList(data) {
  return request({
    url: '/advert/list',
    method: 'post',
    data
  })
}
// 大屏人员考勤数据统计(POST)
export function queryAttend(data) {
  return request({
    url: '/homePage/queryAttend',
    method: 'post',
    data
  })
}
