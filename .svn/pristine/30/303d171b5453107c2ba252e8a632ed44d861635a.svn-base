import request from '@/utils/request-zhgd'

// 塔吊设备基础信息列表
export function getList(data) {
  return request({
    url: '/crane/craneList',
    method: 'post',
    data
  })
}
// 新增塔吊设备
export function save(data) {
  return request({
    url: '/crane/saveCrane',
    method: 'post',
    data
  })
}
// 塔吊黑匣子绑定
export function update(data) {
  return request({
    url: '/craneLocatordata/saveLocator',
    method: 'post',
    data
  })
}
// 删除
export function del(params) {
  return request({
    url: '/crane/deleteById',
    method: 'get',
    params
  })
}
// 塔吊修改
export function deviceUpdate(data) {
  return request({
    url: '/crane/updCrane',
    method: 'post',
    data
  })
}
// 根据id查询设备的基础信息和详细信息
export function view(params) {
  return request({
    url: '/crane/findById',
    method: 'get',
    params
  })
}
// 根据塔吊id查询黑匣子信息
export function view1(params) {
  return request({
    url: '/craneLocatordata/findByCid',
    method: 'get',
    params
  })
}
// 塔吊数据列表
export function historyList(data) {
  return request({
    url: '/craneRecord/list',
    method: 'post',
    data
  })
}
// 根据当前设备获取最新设备数据
export function findNewRecord(params) {
  return request({
    url: '/craneRecord/findNewRecord',
    method: 'get',
    params
  })
}
// 获取工作循环信息
export function dataList(data) {
  return request({
    url: '/craneWorkData/dataList',
    method: 'post',
    data
  })
}
export function craneProList(params) {
  return request({
    url: '/crane/screenPro',
    method: 'get',
    params
  })
}
