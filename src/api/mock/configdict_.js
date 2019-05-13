import Mock from 'mockjs'
import {
  param2Obj
} from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    key: '@first',
    createDate: +Mock.Random.datetime(),
    createUserid: '@increment',
    modifyUserid: '@increment',
    modifyDate: +Mock.Random.datetime(),
    value: '@word',
    remark: '@ctitle'
  }))
}

const getList = config => {
  const {
    key,
    page = 1,
    limit = 10
  } = param2Obj(config.url)
  const mockList = List.filter(item => {
    if (key && item.key.indexOf(key) < 0) return false
    return true
  })

  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  return {
    data: {
      'pageNum': page,
      'pageSize': limit,
      'count': false,
      'totalPage': Math.ceil(mockList.length / limit),
      'totalCount': mockList.length,
      'list': pageList
    },
    success: true,
    timestamp: '' + new Date().getTime()
  }
}
const createEntity = () => ({
  data: 'success',
  success: true,
  timestamp: '' + new Date().getTime()
})
const updateEntity = () => ({
  data: 'success',
  success: true,
  timestamp: '' + new Date().getTime()
})
const deleteEntity = () => ({
  data: 'success',
  success: true,
  timestamp: '' + new Date().getTime()
})

console.log(getList)
console.log(updateEntity)
console.log(createEntity)
console.log(deleteEntity)
// Mock.mock(/\/sys\/config\/list/, 'get', getList)
// Mock.mock(/\/sys\/config\/update/, 'post', updateEntity)
// Mock.mock(/\/sys\/config\/save/, 'post', createEntity)
// Mock.mock(/\/sys\/config\/delete/, 'post', deleteEntity)
