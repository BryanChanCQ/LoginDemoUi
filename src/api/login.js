import request from '@/utils/request'
export function loginByUsernameeee(username, password) {
  return request({ url: '/auth/login', method: 'post', data: { username, password }})
}
export function loginByUsername({
  username,
  password,
  captcha
}) {
  return request({
    url: '/BaseController/auth/login',
    method: 'get',
    params: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}

// export function getUserInfo(token) {
//   return request({
//     url: '/sys/user/info2',
//     method: 'get',
//     params: { token }
//   })
// }

export function getCurrentUser() {
  return request({
    url: '/BaseController/queryCurrentUser',
    method: 'get'
  })
}

export function getMenuByRoleIds(ids) {
  return request.post('/BaseController/queryMenuByRoleIds', ids)
}

export function getImg() {
  return request({
    url: '/sys/captcha',
    method: 'get'
  })
}
