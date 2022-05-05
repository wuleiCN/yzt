import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/qualityControl/list',
    method: 'post',
    data
  })
}
export function processList(data) {
  return request({
    url: '/qualityControl/process',
    method: 'post',
    data
  })
}

