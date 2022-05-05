import request from '@/utils/request-zhgd'

export function getList(data) {
  return request({
    url: '/supplier/findSupplierList',
    method: 'post',
    data
  })
}
export function getTypeList(data) {
  return request({
    url: '/dictType/findTypeList',
    method: 'get',
    data
  })
}

export function save(data) {
  return request({
    url: '/supplier/saveSupplier',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/supplier/updSupplierById',
    method: 'post',
    data
  })
}

export function del(params) {
  return request({
    url: '/supplier/deleSupplierByid',
    method: 'get',
    params
  })
}
