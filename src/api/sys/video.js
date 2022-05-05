import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/video/list',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/video/saveOrUpdate',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/video/delete',
    method: 'post',
    data
  })
}
export function verify(data) {
  return request({
    url: '/video/verify',
    method: 'post',
    data
  })
}
export function questionList(data) {
  return request({
    url: '/questions/list',
    method: 'post',
    data
  })
}
export function questionSaveOrUpdate(data) {
  return request({
    url: '/questions/saveOrUpdate',
    method: 'post',
    data
  })
}
export function questionDel(data) {
  return request({
    url: '/questions/delete',
    method: 'post',
    data
  })
}
export function questionEnable(data) {
  return request({
    url: '/questions/enable',
    method: 'post',
    data
  })
}
