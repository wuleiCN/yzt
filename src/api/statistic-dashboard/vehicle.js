import request from '@/utils/request-zhgd'

// 车牌：   车辆类型   车辆出入口统计    今日入场在场数量       最新识别统计列表（ 最新车辆识别）
export function getCarType(params) {
  return request({
    url: '/vehicleRecord/getCarTypeNumb',
    method: 'get',
    params
  })
}
// 最新识别车辆
export function getRecord(params) {
  return request({
    url: '/vehicleRecord/findNewVehicleRecordByProjectId',
    method: 'get',
    params
  })
}
// 3 列表
export function getWarnList(params) {
  return request({
    url: 'vehicleRecord/findNewVehicleRecord10ByProjectId',
    method: 'get',
    params
  })
}
// 4识别车辆统计
export function getNum(params) {
  return request({
    url: '/vehicleRecord/getVehicleNumbByTime',
    method: 'get',
    params
  })
}

