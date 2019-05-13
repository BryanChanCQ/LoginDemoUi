import request from '@/utils/request'

export function agree(query) {
  return request({
    url: '/deploy-central/deployPlan/audit/agree',
    method: 'get',
    params: query
  })
}

export function refuse(data) {
  return request({
    url: '/deploy-central/deployPlan/audit/refuse',
    method: 'post',
    data
  })
}
