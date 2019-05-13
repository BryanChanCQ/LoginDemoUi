import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/devops/task/listByPage',
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
  return request.post('/devops/task/add', data)
}

export function editById(data) {
  return request.post('/devops/task/updateById', data)
}

export function deleteById(data) {
  return request({
    url: '/devops/task/deleteById',
    method: 'post',
    params: data
  })
}
