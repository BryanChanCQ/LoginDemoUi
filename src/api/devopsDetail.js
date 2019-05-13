import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/appExample/taskDetail',
    method: 'get',
    params: data
  })
}

export function getLog(query) {
  return request({
    url: '/getlog/content',
    method: 'get',
    params: query
  })
}

export function getFullLog(query) {
  return request({
    url: '/getlog/fullcontent',
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

