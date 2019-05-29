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
