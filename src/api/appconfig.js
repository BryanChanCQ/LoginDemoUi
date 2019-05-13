import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/deploy/app/info/listByPage',
    method: 'get',
    params: query
  })
}

export function addApp(data) {
  return request({
    url: '/deploy/app/info/add',
    method: 'post',
    data
  })
}

export function queryOptionList(query) {
  return request({
    url: '/config/list',
    method: 'get',
    params: query
  })
}

export function PackageAction(query) {
  return request({
    url: '/packge/maven',
    method: 'get',
    params: query
  })
}

export function getLog(query) {
  return request({
    url: '/getlog/content',
    method: 'get',
    params: query
  })
}

export function checkAgent(data) {
  return request({
    url: '/deploy/app/info/getAppinfosAgent',
    method: 'post',
    params: data
  })
}

export function submitAgent(data) {
  return request({
    url: '/deploy/app/info/addAgentAppInfo',
    method: 'post',
    data
  })
}

export function addAppInstance(data) {
  return request({
    url: '/appInstance/addAppInstance',
    method: 'post',
    data
  })
}

export function AgentSelect(data) {
  return request({
    url: '/agent/getOtherAgent',
    method: 'post',
    params: data
  })
}

export function checkAppInstance(query) {
  return request({
    url: '/appInstance/listAppInstance',
    method: 'get',
    params: query
  })
}

export function queryInstanceList(query) {
  return request({
    url: '/deploy-central/appInstance/listByCondition',
    method: 'get',
    params: query
  })
}

export function getAppByName(query) {
  return request({
    url: '/deploy-central/app/info/listByPage',
    method: 'get',
    params: query
  })
}

export function queryInstanceStatus(param) {
  return request({
    url: '/deploy-central/app/info/checkAppStatus',
    method: 'get',
    params: param
  })
}

export function getCode(query) {
  return request({
    url: '/deploy-central/constants/code/infoByParentCode',
    method: 'get',
    params: query
  })
}

export function deleteApp(data) {
  return request({
    url: '/deploy/app/info/deleteById',
    method: 'post',
    params: data
  })
}

export function deleteAgentAppInfo(data) {
  return request({
    url: '/deploy/app/info/deleteAgentAppinfoById',
    method: 'post',
    params: data
  })
}

export function deleteAppInstance(data) {
  return request({
    url: '/appInstance/deleteAppInstance',
    method: 'post',
    params: data
  })
}

export function editApp(data) {
  return request({
    url: '/deploy/app/info/updateById',
    method: 'post',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function getUsers(query) {
  return request({
    url: '/admin/api/user/queryUsers',
    method: 'get',
    params: query
  })
}
