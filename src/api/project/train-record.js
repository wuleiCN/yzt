import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/workerTrainRecord/list',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/workerTrainRecord/delete',
    method: 'post',
    data
  })
}
export function getPersonList(data) {
  return request({
    url: '/workerTrainRecord/trainList',
    method: 'post',
    data
  })
}
export function viewAnswer(data) {
  return request({
    url: '/answer/view',
    method: 'post',
    data
  })
}
