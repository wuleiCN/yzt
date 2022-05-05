import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/salaryItem/list',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/salaryItem/delete',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/salaryItem/saveOrUpdate',
    method: 'post',
    data
  })
}
