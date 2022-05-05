import request from '@/utils/request'

/* 角色权限树 */
export function getMenuTree(data) {
  return request({
    url: '/role/tree',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/resources/saveorupdate',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/resources/del',
    method: 'post',
    data
  })
}
