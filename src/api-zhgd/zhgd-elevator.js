import request from '@/utils/request-zhgd'

// 升降机设备基础信息列表
export function getList(data) {
  return request({
    url: '/elevator/findList',
    method: 'post',
    data
  })
}
// 新增升降机设备
export function save(data) {
  return request({
    url: '/elevator/saveElevator',
    method: 'post',
    data
  })
}
// 升降机黑匣子绑定
export function update(data) {
  return request({
    url: '/locatordata/saveData',
    method: 'post',
    data
  })
}
// 升降机修改
export function deviceUpdate(data) {
  return request({
    url: '/elevator/updEle',
    method: 'post',
    data
  })
}
// 根据id查询设备的基础信息和详细信息
export function view(params) {
  return request({
    url: '/elevator/findById',
    method: 'get',
    params
  })
}
// 根据升降机id查询黑匣子信息
export function view1(params) {
  return request({
    url: '/locatordata/findDataByElevatorId',
    method: 'get',
    params
  })
}
// 升降机数据列表
export function historyList(data) {
  return request({
    url: '/eleAddrecord/recordList',
    method: 'post',
    data
  })
}
// 根据当前设备获取最新设备数据
export function findNewRecord(params) {
  return request({
    url: '/eleAddrecord/findNewRecord',
    method: 'get',
    params
  })
}
// 获取工作循环信息
export function dataList(data) {
  return request({
    url: '/eleWorkData/dataList',
    method: 'post',
    data
  })
}
// 删除
export function del(params) {
  return request({
    url: '/elevator/deleteById',
    method: 'get',
    params
  })
}
export function elevatorProList(params) {
  return request({
    url: '/elevator/screenPro',
    method: 'get',
    params
  })
}
