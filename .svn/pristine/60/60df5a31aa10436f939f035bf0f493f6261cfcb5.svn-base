import request from '@/utils/request'

export function examList(data) {
  return request({
    url: data.isClient === '99' ? request.CsBaseUrl('/exam/list') : '/exam/list',
    method: 'post',
    data
  })
}
export function verifyIdCode(data) {
  return request({
    url: data.isClient === '99' ? request.CsBaseUrl('/exam/verifyIdCode') : '/exam/verifyIdCode',
    method: 'post',
    data
  })
}
export function getName(data) {
  return request({
    url: data.isClient === '99' ? request.CsBaseUrl('/exam/getName') : '/exam/getName',
    method: 'post',
    data
  })
}
export function submit(data) {
  return request({
    url: data.isClient === '99' ? request.CsBaseUrl('/exam/submit') : '/exam/submit',
    method: 'post',
    data
  })
}

