import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/deploy/plan/planDetail',
    method: 'get',
    params: data
  })
}

export function checkAppAndAgentStatus(data) {
  return request({
    url: '/deploy/plan/checkAppAndAgentStatus',
    method: 'get',
    params: data
  })
}

export function getCompileIncrementLog(query) {
  return request({
    url: '/getlog/getCompileIncrementLog',
    method: 'get',
    params: query
  })
}

export function applicationIncrementLogAction(query) {
  return request({
    url: '/file/applicationIncrementLogAction',
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

export function PullPackageAction(query) {
  return request({
    url: '/pullpackge/git',
    method: 'get',
    params: query
  })
}

export function startUpJar(query) {
  return request({
    url: '/deploy/startUpJar',
    method: 'get',
    params: query
  })
}

export function UploadFileAction(query) {
  return request({
    url: '/upload/uploadFile',
    method: 'get',
    params: query
  })
}

export function stopJar(query) {
  return request({
    url: '/deploy/stopJar',
    method: 'get',
    params: query
  })
}

export function stopWar(query) {
  return request({
    url: '/deploy/stopWar',
    method: 'get',
    params: query
  })
}

export function downloadAction(query) {
  return request({
    url: '/deploy/downLoad',
    method: 'get',
    params: query
  })
}

export function isWarOrJar(query) {
  return request({
    url: '/deploy/isWarOrJar',
    method: 'get',
    params: query
  })
}

export function startUpWar(query) {
  return request({
    url: '/deploy/startUpWar',
    method: 'get',
    params: query
  })
}
