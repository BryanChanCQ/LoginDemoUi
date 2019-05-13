import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/BaseController/userRoleVoPageInfo',
    method: 'post',
    data
  })
}

export function addUserRole(data) {
  return request.post('/BaseController/addUserRole', data)
}

export function deleteUserRoleById(params) {
  return request({
    url: '/BaseController/deleteUserRoleById',
    method: 'post',
    params: params
  })
}

export function editUserRole(params) {
  return request.post('/BaseController/updateUserRoleById', params)
}
