import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/deployAgent/listByPage',
    method: 'get',
    params: query
  })
}

export function checkAgentStatusPage(query) {
  return request({
    url: '/deployAgent/checkAgentStatusPage',
    method: 'get',
    params: query
  })
}

export function addDeployAgent(data) {
  return request({
    url: '/deployAgent/add',
    method: 'post',
    data
  })
}

export function editDeployAgent(data) {
  return request({
    url: '/deployAgent/updateById',
    method: 'post',
    data
  })
}

export function deleteDeployAgent(data) {
  return request({
    url: '/deployAgent/deleteById',
    method: 'post',
    params: data
  })
}

export function uploadAgent(data) {
  return request({
    url: '/deployAgent/uploadAgent',
    method: 'post',
    params: data
  })
}

export function startUpAgent(data) {
  return request({
    url: '/deployAgent/startUp',
    method: 'post',
    params: data
  })
}

export function stopAgent(data) {
  return request({
    url: '/deployAgent/stopAgent',
    method: 'post',
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

export function submitDeploy(query) {
  return request({
    url: '/deployAgent/pullDeployAgent',
    method: 'get',
    params: query
  })
}

export function PackageAction(query) {
  return request({
    url: '/deployAgent/packageDeployAgent',
    method: 'get',
    params: query
  })
}

