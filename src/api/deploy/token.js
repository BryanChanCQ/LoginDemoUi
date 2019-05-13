import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/index/getToken',
    method: 'get'
  })
}
