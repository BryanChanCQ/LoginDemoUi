import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/config/listByPage',
    method: 'get',
    params: query
  })
}

export function createEntity(data) {
  return request({
    url: '/config/create',
    method: 'post',
    data
  })
}

export function constantCodeEdit(params) {
  return request.post('/deploy-central/constants/code/edit', params)
}

export function deleteConstantCode(query) {
  return request({
    url: '/deploy-central/constants/code/delete',
    method: 'get',
    params: query
  })
}

export function constantCodeAdd(data) {
  return request({
    url: '/deploy-central/constants/code/add',
    method: 'post',
    data
  })
}

export function updateEntity(data) {
  return request({
    url: '/config/update',
    method: 'post',
    data
  })
}

export function deleteEntity(data) {
  return request({
    url: '/config/delete',
    method: 'post',
    data
  })
}
