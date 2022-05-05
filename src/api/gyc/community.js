import request from '@/utils/request'

export function proOptionList(data) {
  return request({
    url: '/projects/optionList',
    method: 'post',
    data
  })
}
export function communityList(data) {
  return request({
    url: '/gycLiveArea/list',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/gycLiveArea/delete',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/gycLiveArea/saveOrUpdate',
    method: 'post',
    data
  })
}
