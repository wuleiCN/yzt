import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/bqjyDevice/list',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/bqjyDevice/saveOrUpdate',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/bqjyDevice/delete',
    method: 'post',
    data
  })
}
// 设备执行列表
export function attcmdinfoList(data) {
  return request({
    url: '/bqjyDevice/cmdList',
    method: 'post',
    data
  })
}
// 设置系统时间
export function setsystime(data) {
  return request({
    url: '/device/setsystime',
    method: 'post',
    data
  })
}
// 接入服务
export function subscribe(data) {
  return request({
    url: '/device/accessService',
    method: 'post',
    data
  })
}
// 设备升级
export function upgrade(data) {
  return request({
    url: '/device/upgrade',
    method: 'post',
    data
  })
}
// 设备重启
export function rebootdevice(data) {
  return request({
    url: '/device/rebootdevice',
    method: 'post',
    data
  })
}

// 所属项目下拉
export function deviceOptionList(data) {
  return request({
    url: '/productPurchaseDetail/optionList',
    method: 'post',
    data
  })
}
