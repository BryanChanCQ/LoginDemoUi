import Mock from 'mockjs'

const userMap = {
  admin: Mock.mock({
    token: '@word',
    roles: ['admin'],
    name: '@first',
    introduction: '@ctitle',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }),
  editor: Mock.mock({
    token: '@word',
    roles: ['editor'],
    name: '@first',
    introduction: '@ctitle',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  })
}

const loginByUsername = config => {
  const {
    username
  } = JSON.parse(config.body)
  return {
    data: userMap[username].token,
    success: true,
    timestamp: '' + new Date().getTime()
  }
  // return userMap[username]
}

const getUserInfo = () => {
  return {
    data: userMap['admin'],
    success: true,
    timestamp: '' + new Date().getTime()
  }
}

const logout = () => ({
  data: 'success',
  success: true,
  timestamp: '' + new Date().getTime()
})

console.log(loginByUsername)
console.log(logout)
console.log(getUserInfo)
// 登录相关
// Mock.mock(/\/sys\/login/, 'post', loginByUsername)
// Mock.mock(/\/sys\/logout/, 'post', logout)
// Mock.mock(/\/sys\/user\/info\.*/, 'get', getUserInfo)
