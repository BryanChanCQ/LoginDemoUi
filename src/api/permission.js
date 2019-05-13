import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/BaseController/roleResourceVoPageInfo',
    method: 'post',
    data
  })
}

export function deleteRoleResourceById(params) {
  return request({
    url: '/BaseController/deleteRoleResourceById',
    method: 'post',
    params: params
  })
}

export function addRoleResource(roleResource) {
  return request.post('/BaseController/addRoleResource', roleResource)
}

export function editRoleResource(roleResource) {
  return request.post('/admin/api/roleresource/updateRoleResourceById', roleResource)
}
