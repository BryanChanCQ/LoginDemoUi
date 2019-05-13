import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/deploy/plan/listByPage',
    method: 'get',
    params: data
  })
}

export function getTeamList(data) {
  return request({
    url: '/config/list',
    method: 'get',
    params: data
  })
}

export function getAppNameList(data) {
  return request({
    url: '/deploy/app/info/list',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request.post('/deploy/plan/add', data)
}

export function editById(data) {
  return request.post('/deploy/plan/updateById', data)
}

export function deleteById(data) {
  return request({
    url: '/deploy/plan/deleteById',
    method: 'post',
    params: data
  })
}

export function getToken() {
  return request({
    url: '/deploy/plan/getToken',
    method: 'get'
  })
}

export function isExistApp(data) {
  return request({
    url: '/deploy/plan/isExistApp',
    method: 'get',
    params: data
  })
}
