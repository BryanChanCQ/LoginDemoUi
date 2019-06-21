import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/Event/getHandleEventHistoryRecord',
    method: 'post',
    data
  })
}
