import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/deploy-central/deployPlan/listByPage',
    method: 'get',
    params: query
  })
}

export function getLog(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function geDeployDetailInfo(query) {
  return request({
    url: '/deploy-central/deployDetail/listByCondition',
    method: 'get',
    params: query
  })
}

export function getReviewConstantInfo(query) {
  return request({
    url: '/deploy-central/constants/code/infoByParentCode',
    method: 'get',
    params: query
  })
}

export function getReportTagInfo(query) {
  return request({
    url: '/deploy-central/report/tags',
    method: 'get',
    params: query
  })
}

export function getReport(query) {
  return request({
    url: '/deploy-central/report/getOne',
    method: 'get',
    params: query
  })
}

export function getAppNameList() {
  return request({
    url: '/deploy-central/app/info/getAppNameList',
    method: 'get'
  })
}

export function getAppTags(query) {
  return request({
    url: '/deploy-central/deployPlan/getAppVersion',
    method: 'get',
    params: query
  })
}

export function getAppByName(query) {
  return request({
    url: '/deploy-central/app/info/listByPage',
    method: 'get',
    params: query
  })
}

export function deploy(data) {
  return request.post('/deploy-central/appDeploy/deploy', data)
}

export function rollback(data) {
  const tmp = {
    nodeLabel: data.nodeLabel,
    reportCode: data.reportCode,
    reportTagId: data.reportTagId
  }
  return request.post('/deploy-central/prod/deploy/rollback', tmp)
}

export function start(data) {
  const tmp = {
    nodeLabel: data.nodeLabel,
    reportCode: data.reportCode,
    reportTagId: data.reportTagId
  }
  return request.post('/deploy-central/prod/deploy/startApp', tmp)
}

export function stop(data) {
  const tmp = {
    nodeLabel: data.nodeLabel,
    reportCode: data.reportCode,
    reportTagId: data.reportTagId
  }
  return request.post('/deploy-central/prod/deploy/stopApp', tmp)
}

export function reset(data) {
  const tmp = {
    reportCode: data.reportCode,
    reportTagId: data.reportTagId
  }
  return request.post('/deploy-central/prod/deploy/cleanQueue', tmp)
}

export function addDeployPlan(data) {
  const tmp = {
    title: data.title,
    windowDate: data.windowDate,
    appName: data.appName,
    version: data.version,
    remark: data.remark
  }
  return request.post('/deploy-central/deployPlan/add', tmp)
}

export function getAppLog(data) {
  return request({
    url: '/deploy-central/appDeploy/getAppLog',
    method: 'get',
    params: data
  })
}

export function addDeployConfirm(data) {
  console.info(data)
  return request({
    url: '/deploy-central/deployConfirm/add',
    method: 'post',
    data
  })
}

export function updateDeployPlanStatus(data) {
  return request({
    url: '/deploy-central/deployPlan/update',
    method: 'post',
    params: data
  })
}

export function editDeployPlan(data) {
  const tmp = {
    id: data.id,
    remark: data.remark,
    title: data.title,
    windowDate: data.windowDate,
    version: data.version,
    appName: data.appName,
    auditStatus: data.auditStatus
  }
  console.info(tmp)
  return request.post('/deploy-central/deployPlan/edit', tmp)
}
