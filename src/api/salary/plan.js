import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/salaryPlan/list',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/salaryPlan/delete',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/salaryPlan/saveOrUpdate',
    method: 'post',
    data
  })
}
export function proList(data) {
  return request({
    url: '/salaryItem/optionList',
    method: 'post',
    data
  })
}
export function optionList(data) {
  return request({
    url: '/dictionaries/getBankList',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/salaryPlan/detail',
    method: 'post',
    data
  })
}

export function bankdetail(data) {
  return request({
    url: '/projectAccount/detail',
    method: 'post',
    data
  })
}
export function bankSaveOrUpdate(data) {
  return request({
    url: '/projectAccount/saveOrUpdate',
    method: 'post',
    data
  })
}
