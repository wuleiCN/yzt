import request from '@/utils/request'

export function optionList(data) {
  return request({
    url: '/dictionaries/optionList',
    method: 'post',
    data
  })
}
