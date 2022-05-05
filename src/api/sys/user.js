import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function getRouter(data) {
  return request({
    url: '/user/getResources',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/loginOut',
    method: 'post'
  })
}
export function getList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}
export function getRoleList(data) {
  return request({
    url: '/role/list2',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/user/saveorupdate',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data
  })
}
export function unlock(data) {
  return request({
    url: '/user/unlock',
    method: 'post',
    data
  })
}
// 选择集团公司 userType === 0 && isManager === 1
export function getGroupComList(data) {
  return request({
    url: '/company/getGroupComList',
    method: 'post',
    data
  })
}

// 项目下拉
export function getprojectList(data) {
  return request({
    url: '/projects/getProList',
    method: 'post',
    data
  })
}
// 参建单位下拉
export function getConstructionList(data) {
  return request({
    url: '/construction/listByProId',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/user/detail',
    method: 'post',
    data
  })
}
export function updatePsw(data) {
  return request({
    url: '/version/updatePassword',
    method: 'post',
    data
  })
}
export function logoDetail(data) {
  return request({
    url: '/sysUserConfig/detail',
    method: 'post',
    data
  })
}
export function setLogoSaveOrUpdate(data) {
  return request({
    url: '/sysUserConfig/saveOrUpdate',
    method: 'post',
    data
  })
}
export function sendSms(data) {
  return request({
    url: '/user/sendSms',
    method: 'post',
    data
  })
}
export function smsLogin(data) {
  return request({
    url: '/user/smsLogin',
    method: 'post',
    data
  })
}

export function webLogList(data) {
  return request({
    url: '/webLog/list',
    method: 'post',
    data
  })
}
