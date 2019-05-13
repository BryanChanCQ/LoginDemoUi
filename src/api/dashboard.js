import request from '@/utils/request'

export function getDashboardData() {
  return request({
    url: '/index/statistics',
    method: 'get'
  })
}

export function getDeployStatistics(data) {
  return request({
    url: '/index/barCharts',
    method: 'get',
    params: data
  })
}

export function getDeploying() {
  return request({
    url: '/index/deploying',
    method: 'get'
  })
}

export function getWaitDeploy() {
  return request({
    url: '/index/waitDeploy',
    method: 'get'
  })
}
