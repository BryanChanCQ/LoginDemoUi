import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/BaseController/dictionaryVoPageInfo',
    method: 'post',
    data
  })
}

export function queryParentDictionary(data) {
  return request({
    url: '/BaseController/queryParentDictionary',
    method: 'post',
    data
  })
}

export function addDictionary(data) {
  return request({
    url: '/BaseController/addDictionary',
    method: 'post',
    data
  })
}

export function deleteDictionaryById(id) {
  return request({
    url: '/BaseController/deleteDictionaryById',
    method: 'get',
    params: id
  })
}

export function updateDictionaryById(data) {
  return request({
    url: '/BaseController/updateDictionaryById',
    method: 'post',
    data
  })
}
