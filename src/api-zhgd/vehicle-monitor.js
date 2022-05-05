import request from '@/utils/request-zhgd'

export function findVehicleDeviceList(data) {
  return request({
    url: '/vehicleDevice/findVehicleDeviceList',
    method: 'post',
    data
  })
}
export function findVehicleRecordList(data) {
  return request({
    url: '/vehicleRecord/findVehicleRecordList',
    method: 'post',
    data
  })
}
export function findNewVehicleRecordById(params) {
  return request({
    url: '/vehicleRecord/findNewVehicleRecordById',
    method: 'get',
    params
  })
}
export function vehicleProList(params) {
  return request({
    url: '/vehicleDevice/screenPro',
    method: 'get',
    params
  })
}
