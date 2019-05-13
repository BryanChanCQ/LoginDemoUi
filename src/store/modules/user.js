import {
  loginByUsername,
  logout,
  getCurrentUser,
  getImg
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

// import defaultAvatar from '@/assets/images/f778738c-e4f8-4870-b634-56703b4acafe.gif'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: 'xxx管理员',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 初始化session并取得验证码
    InitLogin({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getImg().then(res => {
          commit('SET_TOKEN', res.data.data.sid)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        const setTokenInt = token => {
          commit('SET_TOKEN', token)
          setToken(token)
        }
        loginByUsername(userInfo).then(response => {
          setTokenInt(response.data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetCurrentUser({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getCurrentUser().then(response => {
          // if (!response.data || !response.data.success) { // 由于mockjs 不支持自定义状态码只能这样hack
          //   reject('error')
          // }
          console.info('getCurrentUser:')
          console.info(response)
          commit('SET_ROLES', ['admin'])
          commit('SET_NAME', response.data.data.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo().then(response => {
    //       if (!response.data || !response.data.success) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error')
    //       }
    //       commit('SET_ROLES', ['admin'])
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 用户主动登出
    LogOut({
      commit,
      state
    }) {
      const handleLogout = () => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
      }
      return new Promise((resolve, reject) => {
        logout().then(() => {
          handleLogout()
          return resolve()
        }).catch(error => {
          handleLogout()
          return reject(error)
        })
      })
    },

    // 校验失败自动 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    showResult(title, msg, type) {
      if (type === 'success') {
        this.$notify({
          title: title,
          message: msg,
          type: type,
          duration: 2000
        })
      } else {
        this.$notify.error({
          title: title,
          message: msg,
          duration: 3000
        })
      }
    }

    // 动态修改权限
    // ChangeRoles({
    //   commit
    // }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       // const data = response.data
    //       // commit('SET_ROLES', data.roles)
    //       commit('SET_ROLES', ['' + role])
    //       // commit('SET_NAME', data.name)
    //       // commit('SET_AVATAR', data.avatar)
    //       // commit('SET_INTRODUCTION', data.introduction)
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
