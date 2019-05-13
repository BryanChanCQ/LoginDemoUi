import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/BaseController/menuVoPageInfo',
    method: 'post',
    data
  })
}

export function queryResources(data) {
  return request({
    url: '/BaseController/menuVoPageInfo',
    method: 'post',
    data
  })
}

export function menuVoListForOther(data) {
  return request({
    url: '/BaseController/menuVoListForOther',
    method: 'post',
    data
  })
}

export function deleteMenuById(data) {
  return request({
    url: '/BaseController/deleteMenuById',
    method: 'post',
    params: data
  })
}
