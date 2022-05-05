import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/version/list',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/version/saveOrUpdate',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/version/delAll',
    method: 'post',
    data
  })
}

export function openList(data) {
  return request({
    url: '/open/list',
    method: 'post',
    data
  })
}
export function openSaveOrUpdate(data) {
  return request({
    url: '/open/saveOrUpdate',
    method: 'post',
    data
  })
}
export function targetOptionList(data) {
  return request({
    url: '/open/getTargetOptionList',
    method: 'post',
    data
  })
}
export function openDelete(data) {
  return request({
    url: '/open/delete',
    method: 'post',
    data
  })
}
