import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/dangerousLargeProject/list',
    method: 'post',
    data
  })
}
export function saverOrUpdate(data) {
  return request({
    url: '/dangerousLargeProject/saverOrUpdate',
    method: 'post',
    data
  })
}
export function getDetail(data) {
  return request({
    url: '/dangerousLargeProject/detail',
    method: 'post',
    data
  })
}
export function deleteProject(data) {
  return request({
    url: '/dangerousLargeProject/del',
    method: 'post',
    data
  })
}
export function downloadFile(data) {
  return request({
    url: '/dangerousLargeProject/downloadFile',
    method: 'post',
    data
  })
}
