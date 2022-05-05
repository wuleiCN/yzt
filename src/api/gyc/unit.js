import request from '@/utils/request'

export function liveAreaList(data) {
  return request({
    url: '/gycLiveArea/optionList',
    method: 'post',
    data
  })
}
export function unitList(data) {
  return request({
    url: '/gycUnit/list',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/gycUnit/delete',
    method: 'post',
    data
  })
}
export function optionList(data) {
  return request({
    url: '/dictionaries/optionList',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/gycUnit/saveOrUpdate',
    method: 'post',
    data
  })
}
export function generateDormitory(data) {
  return request({
    url: '/gycDormitory/generateDormitory',
    method: 'post',
    data
  })
}
export function dormitoryList(data) {
  return request({
    url: '/gycDormitory/list',
    method: 'post',
    data
  })
}
export function batchUpdate(data) {
  return request({
    url: '/gycDormitory/batchUpdate',
    method: 'post',
    data
  })
}
export function delDormitory(data) {
  return request({
    url: '/gycDormitory/delete',
    method: 'post',
    data
  })
}
// 宿舍分配列表
export function allotList(data) {
  return request({
    url: '/gycDormitory/allotList',
    method: 'post',
    data
  })
}
// 左边选择宿舍
export function dormitoryTree(data) {
  return request({
    url: '/gycDormitory/tree',
    method: 'post',
    data
  })
}
// 右边选择参建单位
export function listByProId(data) {
  return request({
    url: '/construction/listByProId',
    method: 'post',
    data
  })
}
// 保存宿舍分配
export function saveAllot(data) {
  return request({
    url: '/gycDormitory/allotSave',
    method: 'post',
    data
  })
}
// 宿舍详情
export function checkedInList(data) {
  return request({
    url: '/gycDormitory/checkedInList',
    method: 'post',
    data
  })
}
