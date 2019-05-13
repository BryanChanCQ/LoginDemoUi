import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/sys/log/list',
    method: 'get',
    params: query
  })
}
