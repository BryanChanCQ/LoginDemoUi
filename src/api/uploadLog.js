import request from '@/utils/request'

export function getUploadLog(query) {
  return request({
    url: '/getlog/uploadContent',
    method: 'get',
    params: query
  })
}

export function getUploadFullContent(query) {
  return request({
    url: '/getlog/uploadFullContent',
    method: 'get',
    params: query
  })
}

export function uploadFileAction(query) {
  return request({
    url: '/upload/file',
    method: 'get',
    params: query
  })
}

