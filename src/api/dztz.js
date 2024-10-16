import request from '@/utils/request'

export function getDztzList(query) {
  return request({
    url: '/vue-element-admin/product/dztz/list',
    method: 'get',
    params: query
  })
}
