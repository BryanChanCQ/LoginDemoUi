import request from '@/utils/request'

export function getHistoryList(data) {
  return request({
    url: '/history/queryHistoryResponse', //  历史数据
    method: 'post',
    data
  })
}
