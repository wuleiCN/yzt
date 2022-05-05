import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/safetyInspection/list',
    method: 'post',
    data
  })
}
export function processList(data) {
  return request({
    url: '/safetyInspection/process',
    method: 'post',
    data
  })
}

