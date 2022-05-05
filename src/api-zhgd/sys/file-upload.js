import request from '@/utils/request-zhgd'
// 大屏首页轮播/视频上传接口(POST)
export function uploadFile(data) {
  return request({
    url: '/advert/uploadFile',
    method: 'post',
    data
  })
}
// 保存大屏首页轮播/视频记录接口(POST)
export function save(data) {
  return request({
    url: '/advert/save',
    method: 'post',
    data
  })
}
// 首页轮播/视频列表(POST)
export function getList(data) {
  return request({
    url: '/advert/list',
    method: 'post',
    data
  })
}
// 启用/停用-轮播/视频(POST)
export function update(data) {
  return request({
    url: '/advert/update',
    method: 'post',
    data
  })
}
// 获取下拉项目列表
export function projectList(params) {
  return request({
    url: 'project/getByToken',
    method: 'get',
    params
  })
}
// 删除
export function del(params) {
  return request({
    url: 'advert/delete',
    method: 'get',
    params
  })
}
