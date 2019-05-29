import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Issue/find',
    method: 'get'
  })
}

export function handleIssue(data) {
  return request({
    url: '/Issue/approve',
    method: 'get',
    params: data
  })
}
