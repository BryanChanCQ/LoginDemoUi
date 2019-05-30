import request from '@/utils/request'

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

export function submitIssue(data) {
  return request({
    url: '/Issue/submitIssue',
    method: 'post',
    data
  })
}

export function uploadAttechmentFile() {
  return request({
    url: '/Issue/uploadAttechmentFile',
    method: 'post'
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
    params: data
  })
}
