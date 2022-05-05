import request from '@/utils/request'

export function getTreeList(data) {
  return request({
    url: 'company/getTree',
    method: 'post',
    data
  })
}
export function getList(data) {
  return request({
    url: '/projects/list',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/projects/saveOrUpdate',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/projects/delete',
    method: 'post',
    data
  })
}

export function getProjectsType(data) {
  return request({
    url: '/projects/getProjectsType',
    method: 'post',
    data
  })
}
export function getProjectsState(data) {
  return request({
    url: '/projects/getProjectsState',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/projects/detail',
    method: 'post',
    data
  })
}
export function setList(data) {
  return request({
    url: '/dictionaries/optionList',
    method: 'post',
    data
  })
}
export function synDetail(data) {
  return request({
    url: '/syn/detail',
    method: 'post',
    data
  })
}
export function synSaveOrUpdate(data) {
  return request({
    url: '/syn/saveOrUpdate',
    method: 'post',
    data
  })
}
export function getLogList(data) {
  return request({
    url: '/synRecord/list',
    method: 'post',
    data
  })
}
// 项目设置详情
export function proConfigDetail(data) {
  return request({
    url: '/proConfig/detail',
    method: 'post',
    data
  })
}
// 项目设置修改
export function proConfigSaveOrUpdate(data) {
  return request({
    url: '/proConfig/saveOrUpdate',
    method: 'post',
    data
  })
}
// 项目设置获取组织机构
export function getOrgList(data) {
  return request({
    url: '/syn/orgList',
    method: 'post',
    data
  })
}

