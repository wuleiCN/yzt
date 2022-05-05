import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/contractCategory/list',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/contractCategory/saveOrUpdate',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/contractCategory/delete',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/contractCategory/detail',
    method: 'post',
    data
  })
}
export function getKeyWord(data) {
  return request({
    url: '/contractTemp/keyWord',
    method: 'post',
    data
  })
}
export function getCategoryList(data) {
  return request({
    url: '/contractCategory/getList',
    method: 'post',
    data
  })
}
export function getTempDetail(data) {
  return request({
    url: '/contractTemp/detail',
    method: 'post',
    data
  })
}
export function tempSaveOrUpdate(data) {
  return request({
    url: '/contractTemp/saveOrUpdate',
    method: 'post',
    data
  })
}
