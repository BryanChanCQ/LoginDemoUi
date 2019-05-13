import Mock from 'mockjs'
import {
  param2Obj
} from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    createDate: +Mock.Random.date('T'),
    params: {
      'id': '@integer(1, 1000)',
      'username': '@first',
      'email': '@email',
      'mobile': '13020202020',
      'status': 1,
      'createUserid': '@integer(1, 1000)',
      'createDate': '@date',
      'modifyUserid': '@integer(1, 1000)',
      'modifyDate': '@date',
      'roleIdList': ['4', '4']
    },
    username: '@first',
    ip: '@ip',
    'method|1': ['com.fbank.fast.admin.web.UserController.save()',
      'com.fbank.fast.admin.web.RoleController.save()',
      'com.fbank.fast.admin.web.UserController.update()'
    ],
    'operation|1': ['新增用户', '修改角色', '更新用户', '删除菜单']
  }))
}

const getList = config => {
  const {
    username,
    operation,
    page = 1,
    limit = 10
  } = param2Obj(config.url)
  const mockList = List.filter(item => {
    if ((username && item.username.indexOf(username) < 0) ||
      (operation && item.operation.indexOf(operation) < 0)) {
      return false
    }
    // if (username && item.username.indexOf(username) < 0) return false
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

console.log(getList)
// Mock.mock(/\/sys\/log\/list/, 'get', getList)
