import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/config/listByPage',
    method: 'get',
    params: query
  })
}

export function getAllParentName(query) {
  return request({
    url: '/config/list',
    method: 'get',
    params: query
  })
}

export function add(data) {
  return request.post('/config/add', data)
}

export function editById(data) {
  return request.post('/config/updateById', data)
}

export function deleteById(data) {
  return request({
    url: '/config/deleteById',
    method: 'post',
    params: data
  })
}
