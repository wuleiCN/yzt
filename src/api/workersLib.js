import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/workersLib/list',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/workersLib/saveOrUpdate',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/workersLib/delete',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/workersLib/detail',
    method: 'post',
    data
  })
}

export function badRecords(data) {
  return request({
    url: '/workersLib/getBadRecords',
    method: 'post',
    data
  })
}
export function getRewardPunish(data) {
  return request({
    url: '/workersLib/getRewardPunish',
    method: 'post',
    data
  })
}
export function certificate(data) {
  return request({
    url: '/workersLib/getCertificate',
    method: 'post',
    data
  })
}
export function proListByWorkerId(data) {
  return request({
    url: '/workersLib/getProListByWorkerId',
    method: 'post',
    data
  })
}
// 工种选择
export function hotWorkerType(data) {
  return request({
    url: '/dictionaries/getHotWorkerType',
    method: 'post',
    data
  })
}

