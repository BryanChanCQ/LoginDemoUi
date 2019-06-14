import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/Event/eventVoPageInfo',
    method: 'post',
    data
  })
}

export function saveEvent(data) {
  return request({
    url: '/Event/saveEvent',
    method: 'post',
    data
  })
}

export function deleteEvent(data) {
  return request({
    url: '/Event/deleteEvent',
    method: 'get',
    params: data
  })
}

export function editEvent(data) {
  return request({
    url: '/Event/editEvent',
    method: 'post',
    data
  })
}

export function submitEvent(data) {
  return request({
    url: '/Event/submitEvent',
    method: 'post',
    data
  })
}

export function getUploadFileList(data) {
  return request({
    url: '/Event/getUploadFileList',
    method: 'get',
    params: data
  })
}

export function deleteUploadFile(data) {
  return request({
    url: '/Event/deleteUploadFile',
    method: 'get',
    params: data
  })
}

export function downloadAttachmentFile(data) {
  return request({
    url: '/Event/downloadAttachmentFile',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}

export function queryInstitution() {
  return request({
    url: '/Event/queryInstitution',
    method: 'get'
  })
}

export function queryDictionary(data) {
  return request({
    url: '/Event/queryDictionary',
    method: 'get',
    params: data
  })
}

export function queryHandleEventGroup(data) {
  return request({
    url: '/Event/queryHandleEventGroup',
    method: 'get',
    params: data
  })
}

export function queryHandleEventStaff(data) {
  return request({
    url: '/Event/queryHandleEventStaff',
    method: 'get',
    params: data
  })
}

export function getCurrentOptionResult() {
  return request({
    url: '/Event/getCurrentOptionResult',
    method: 'get'
  })
}

export function closeProcess(data) {
  return request({
    url: '/Event/closeProcess',
    method: 'post',
    data
  })
}
