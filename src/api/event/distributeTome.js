import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/Event/find',
    method: 'post',
    data
  })
}

export function handleEvent(data) {
  return request({
    url: '/Event/approve',
    method: 'get',
    params: data
  })
}

export function saveDetail(data) {
  return request({
    url: '/Event/saveDetail',
    method: 'post',
    data
  })
}

export function queryHandleEventDetails(data) {
  return request({
    url: '/Event/queryHandleEventDetails',
    method: 'get',
    params: data
  })
}

export function queryHandleEventDetailsById(data) {
  return request({
    url: '/Event/queryHandleEventDetailsById',
    method: 'get',
    params: data
  })
}

export function transferToOtherStaff(data) {
  return request({
    url: '/Event/transferToOtherStaff',
    method: 'get',
    params: data
  })
}

export function passToparentHandle(data) {
  return request({
    url: '/Event/passToparentHandle',
    method: 'get',
    params: data
  })
}

