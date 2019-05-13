import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/BaseController/queryRolePage',
    method: 'post',
    data
  })
}

export function selectRole() {
  return request({
    url: '/sys/role/select',
    method: 'get'
  })
}

export function queryRoles(data) {
  return request({
    url: '/BaseController/queryRolePage',
    method: 'post',
    data
  })
}

export function roleVoListForOther(data) {
  return request({
    url: '/BaseController/roleVoListForOther',
    method: 'post',
    data
  })
}

export function queryMenuByRoleId(id) {
  return request({
    url: '/admin/api/role/queryMenuByRoleId',
    method: 'get',
    params: id
  })
}

export function addRole(data) {
  return request({
    url: '/BaseController/addRole',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: '/BaseController/updateRoleById',
    method: 'post',
    data
  })
}

export function deleteRoleById(data) {
  return request({
    url: '/BaseController/deleteRoleById',
    method: 'post',
    params: data
  })
}
