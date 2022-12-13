import request from '@/utils/request'

export function getList() {
  return request({
    url: '/salaryStar/queryPwList',
    method: 'get'
  })
}

export function updateStalyStart(data) {
  return request({
    url: 'salaryStar/updateStalyStart',
    method: 'post',
    data
  })
}

export function addStalyStart(data) {
  return request({
    url: 'salaryStar/addStalyStart',
    method: 'post',
    data
  })
}

export function getStalyStartList(data) {
  return request({
    url: 'salaryStar/queryStalyStartList',
    method: 'post',
    data
  })
}

export function delStalyStart(params) {
  return request({
    url: 'salaryStar/delStalyStart',
    method: 'post',
    params
  })
}

export function queryStyleInfo(params) {
  return request({
    url: '/salaryStar/queryStyleInfo',
    method: 'post',
    params
  })
}

export function queryQuarte(params) {
  return request({
    url: '/salaryStar/queryQuarter',
    method: 'get',
    params
  })
}

export function getMonTeam(params) {
  return request({
    url: '/salaryStar/getMonTeam',
    method: 'get',
    params
  })
}
