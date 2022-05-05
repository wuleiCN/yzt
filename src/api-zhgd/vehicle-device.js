import request from '@/utils/request-zhgd'

export function getList(data) {
  return request({
    url: '/vehicleDevice/findVehicleDeviceList',
    method: 'post',
    data
  })
}
export function save(data) {
  return request({
    url: '/vehicleDevice/saveVehicleDevice',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/vehicleDevice/updateVehicleDeviceById',
    method: 'post',
    data
  })
}
export function del(params) {
  return request({
    url: '/vehicleDevice/delVehicleDeviceById',
    method: 'get',
    params
  })
}
export function synDetail(data) {
  return request({
    url: '/dockConfig/findConfigBy',
    method: 'post',
    data
  })
}
export function synSaveOrUpdate(data) {
  return request({
    url: '/dockConfig/saveConfig',
    method: 'post',
    data
  })
}
export function getLogList(data) {
  return request({
    url: 'dockLog/findList ',
    method: 'post',
    data
  })
}
