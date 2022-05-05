import request from '@/utils/request'

export function del(data) {
  return request({
    url: '/salaryPlan/unassign',
    method: 'post',
    data
  })
}
export function optionPlanList(data) {
  return request({
    url: '/salaryPlan/optionList',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/salaryPlan/distribution',
    method: 'post',
    data
  })
}
