import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Event/find',
    method: 'get'
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

