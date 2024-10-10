import request from '@/utils/request'

export function fetchWarnList(query) {
  return request({
    url: '/vue-element-admin/warn/list',
    method: 'get',
    params: query
  })
}
