import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    createDate: +Mock.Random.date('T'),
    username: '@first',
    'email|1': ['11634432@qq.com', 'test01209@163.com', 'amdinsupport@sina.com'],
    modifyDate: +Mock.Random.date('T'),
    status: '@integer(0, 1)',
    'role|1-3': ['@integer(2, 4)'],
    'mobile|1': ['13020202020', '15620912016', '18620209958']
  }))
}

const getList = config => {
  const { username, page = 1, limit = 10 } = param2Obj(config.url)
  console.log(username)
  const mockList = List.filter(item => {
    if (username && item.username.indexOf(username) < 0) return false
    return true
  })

  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  return {
    data: { 'pageNum': page, 'pageSize': limit, 'count': false, 'totalPage': Math.ceil(mockList.length / limit), 'totalCount': mockList.length, 'list': pageList },
    success: true,
    timestamp: '' + new Date().getTime()
  }
}

const createUser = () => ({
  data: 'success',
  success: true,
  timestamp: '' + new Date().getTime()
})

const updateUser = () => ({
  data: 'success',
  success: true,
  timestamp: '' + new Date().getTime()
})

console.log(getList)
console.log(updateUser)
console.log(createUser)
// Mock.mock(/\/sys/\/user\/list/, 'get', getList)
// Mock.mock(/\/sys\/user\/update/, 'post', updateUser)
// Mock.mock(/\/sys\/user\/save/, 'post', createUser)
