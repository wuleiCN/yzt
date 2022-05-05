import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/workType/list',
    method: 'post',
    data
  })
}

// export function saveOrUpdate(data) {
//   return request({
//     url: '/workType/saveOrUpdate',
//     method: 'post',
//     data
//   })
// }

export function del(data) {
  return request({
    url: '/workType/delete',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/workType/detail',
    method: 'post',
    data
  })
}
export function changeType(data) {
  return request({
    url: '/workType/updateType',
    method: 'post',
    data
  })
}
