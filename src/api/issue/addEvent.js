import request from './node_modules/@/utils/request'

export function getList(data) {
  return request({
    url: '/Issue/issueVoPageInfo',
    method: 'post',
    data
  })
}

export function addIssue(data) {
  return request({
    url: '/Issue/saveIssue',
    method: 'post',
    data
  })
}

export function deleteIssue(data) {
  return request({
    url: '/Issue/deleteIssue',
    method: 'get',
    params: data
  })
}

export function editIssue(data) {
  return request({
    url: '/Issue/editIssue',
    method: 'post',
    data
  })
}

export function submitIssue(data) {
  return request({
    url: '/Issue/submitIssue',
    method: 'post',
    data
  })
}

export function getUploadFileList(data) {
  return request({
    url: '/Issue/getUploadFileList',
    method: 'get',
    params: data
  })
}

export function deleteUploadFile(data) {
  return request({
    url: '/Issue/deleteUploadFile',
    method: 'get',
    params: data
  })
}

export function downloadAttachmentFile(data) {
  return request({
    url: '/Issue/downloadAttachmentFile',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}

export function queryInstitution() {
  return request({
    url: '/Issue/queryInstitution',
    method: 'get'
  })
}

export function queryPriorityLevel(data) {
  return request({
    url: '/Issue/queryPriorityLevel',
    method: 'get',
    params: data
  })
}

export function queryHandleIssueGroup(data) {
  return request({
    url: '/Issue/queryHandleIssueGroup',
    method: 'get',
    params: data
  })
}

export function queryHandleIssueStaff(data) {
  return request({
    url: '/Issue/queryHandleIssueStaff',
    method: 'get',
    params: data
  })
}
