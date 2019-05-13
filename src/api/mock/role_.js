import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    roleName: '@first',
    createDate: +Mock.Random.date('T'),
    createUserid: '@increment',
    modifyUserid: '@increment',
    modifyDate: +Mock.Random.date('T'),
    remark: '@ctitle'
  }))
}

const getList = config => {
  const { page = 1, limit = 10 } = param2Obj(config.url)

  const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  return {
    data: { 'pageNum': page, 'pageSize': limit, 'count': false, 'totalPage': Math.ceil(List.length / limit), 'totalCount': List.length, 'list': pageList },
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
// Mock.mock(/\/sys\/role\/list/, 'get', getList)
// Mock.mock(/\/sys\/role\/update/, 'post', updateEntity)
Mock.mock(/\/sys\/role\/create/, 'post', createEntity)
Mock.mock(/\/sys\/role\/delete/, 'post', deleteEntity)
