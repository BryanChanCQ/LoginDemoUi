import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/deploy-central/server/listByPage',
    method: 'get',
    params: query
  })
}

export function addServer(param) {
  return request.post('/deploy-central/server/add', param)
}

export function inspect(query) {
  return request({
    url: '/deploy-central/server/inspect',
    method: 'get',
    params: query
  })
}

export function getAppNames() {
  return request({
    url: '/deploy-central/app/info/getAppNameList',
    method: 'get'
  })
}

export function deleteNode(query) {
  return request({
    url: '/deploy-central/server/delete',
    method: 'get',
    params: query
  })
}

export function getInspectResult(query) {
  return request({
    url: '/deploy-central/server/inspect/info',
    method: 'get',
    params: query
  })
}

export function createRole(data) {
  return request({
    url: '/sys/role/create',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/sys/role/update',
    method: 'post',
    data
  })
}

export function deleteEntity(data) {
  return request({
    url: '/sys/role/delete',
    method: 'post',
    data
  })
}
