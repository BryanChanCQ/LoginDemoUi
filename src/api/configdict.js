import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/sys/config/list',
    method: 'get',
    params: query
  })
}

export function createEntity(data) {
  return request({
    url: '/sys/config/save',
    method: 'post',
    data
  })
}

export function updateEntity(data) {
  return request({
    url: '/sys/config/update',
    method: 'post',
    data
  })
}

export function getEntity(id) {
  return request({
    url: '/sys/config/info2/' + id,
    method: 'get'
  })
}

export function deleteEntity(data) {
  return request({
    url: '/sys/config/delete',
    method: 'post',
    data
  })
}
