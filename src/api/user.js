import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/BaseController/userVoPageInfo',
    method: 'post',
    data
  })
}

export function queryUsers(data) {
  return request({
    url: '/BaseController/userList',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/BaseController/register',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/BaseController/updateUserById',
    method: 'post',
    data
  })
}

export function editUserByName(data) {
  return request({
    url: '/admin/api/user/updateUserByUserName',
    method: 'post',
    data
  })
}

export function deleteUserById(data) {
  console.info(data)
  return request({
    url: '/BaseController/deleteUserById',
    method: 'post',
    params: data
  })
}
