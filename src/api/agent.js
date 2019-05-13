import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/agent/listByPage',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request.post('agent/add', data)
}

export function editById(data) {
  return request.post('agent/updateById', data)
}

export function deleteById(data) {
  return request({
    url: 'agent/deleteById',
    method: 'post',
    params: data
  })
}

export function checkAgentStatusPage(data) {
  return request({
    url: '/agent/checkAgentStatusPage',
    method: 'post',
    params: data
  })
}
