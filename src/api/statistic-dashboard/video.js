import request from '@/utils/request-zhgd'

// 1 塔吊设备
export function screenPro(data) {
  return request({
    url: '/crane/screenPro',
    method: 'post',
    data
  })
}
// 地图详情
export function detail(data) {
  return request({
    url: '/video/getCameraListSite',
    method: 'post',
    data
  })
}
// 地图详情
export function saveOrUpdateImg(data) {
  return request({
    url: '/video/saveOrUpdateImg',
    method: 'post',
    data
  })
}
// 地图详情
export function saveOrUpdate(data) {
  return request({
    url: '/video/saveOrUpdateSeat',
    method: 'post',
    data
  })
}
// 地图详情
export function delMark(data) {
  return request({
    url: '/video/deleteSeat',
    method: 'post',
    data
  })
}

