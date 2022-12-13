import request from '@/utils/request-zhgd'

// 报警type字典
export function getAiEnum(params) {
  return request({
    url: '/aiAlarm/getAiEnum',
    method: 'get',
    params
  })
}

export function getViolationAlarm(params) {
  return request({
    url: `/aiAlarm/violationAlarmStatistics?projectId=${params.pId}&type=${params.type}`,
    method: 'get'
  })
}

export function getAIEarlyWarningTrend(params) {
  return request({
    url: `/aiAlarm/aIEarlyWarningTrend?projectId=${params.pId}`,
    method: 'get'
  })
}
export function getIntelligentPhotoRecord(params) {
  return request({
    url: `/aiAlarm/intelligentPhotoRecording?projectId=${params.pId}`,
    method: 'get'
  })
}

export function getFindNewsVideoList(data) {
  return request({
    url: '/aiVideo/findNewsVideoList',
    method: 'post',
    data
  })
}
