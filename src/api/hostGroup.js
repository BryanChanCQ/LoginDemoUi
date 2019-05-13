import request from '@/utils/request'

export function getHostGroup() {
  return request({
    url: '/hostGroup/queryAllHostGroup',
    method: 'get'
  })
}

export function getHostGroupByParam(data) {
  return request({
    url: '/hostGroup/queryHostGroupByName',
    method: 'post',
    data
  })
}

export function queryHostsByhostGroupId(data) {
  return request({
    url: '/host/queryHostResponse',
    method: 'post',
    data
  })
}
