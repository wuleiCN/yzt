import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/constructionLib/list',
    method: 'post',
    data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/constructionLib/saveOrUpdate',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/constructionLib/delete',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/constructionLib/detail',
    method: 'post',
    data
  })
}
export function selectList(data) {
  return request({
    url: '/constructionLib/getProListByConsId',
    method: 'post',
    data
  })
}
export function punList(data) {
  return request({
    url: '/conRewardPunishment/getListBySuid',
    method: 'post',
    data
  })
}
