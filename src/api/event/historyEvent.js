import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Event/getHandleEventHistoryRecord',
    method: 'get'
  })
}
