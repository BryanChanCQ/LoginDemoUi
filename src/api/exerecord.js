import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/deploy-central/build-history/listByPage',
    method: 'get',
    params: query
  })
}

export function getLog(url) {
  return request({
    url: url,
    method: 'get'
  })
}
