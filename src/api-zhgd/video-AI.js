import request from '@/utils/request-zhgd'

export function getList(data) {
  return request({
    url: '/aiVideo/findVideoList',
    method: 'post',
    data
  })
}

export function saveVideo(data) {
  return request({
    url: '/aiVideo/saveVideo',
    method: 'post',
    data
  })
}

export function delVideo(params) {
  return request({
    url: '/aiVideo/delVideo',
    method: 'get',
    params
  })
}

export function videoProList(params) {
  return request({
    url: '/video/screenPro',
    method: 'get',
    params
  })
}

// 抓拍图片

export function photoRecordList(data) {
  return request({
    url: '/aiAlarm/photoRecording',
    method: 'post',
    data
  })
}
