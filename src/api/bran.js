import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/BaseController/listBran',
    method: 'post',
    data
  })
}

export function addBran(data) {
  return request({
    url: '/BaseController/addBran',
    method: 'post',
    data
  })
}

export function updateBran(data) {
  return request({
    url: '/BaseController/updBran',
    method: 'post',
    data
  })
}

export function deleteBran(data) {
  console.log(data)
  return request({
    url: '/BaseController/delBran',
    method: 'post',
    params: data
  })
}

export function getAllBranchs() {
  return request({
    url: '/BaseController/getAllBranchs',
    method: 'get'
  })
}
