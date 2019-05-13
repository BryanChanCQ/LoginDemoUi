import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
// MessageBox
import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    var token = getToken()
    // Do something before request is sent
    if (token !== undefined) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['jwtHeader'] = token
    } else {
      console.info('no token')
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response
    if (res.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.status === 400 || res.status === 401 || res.status === 402) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出',
          { confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      // session 超时....
      if (response.headers['content-type'] === 'text/html') {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
    } else {
      return response
    }
  },
  /**
   * 比较神奇的是下面的代码只会在我测试的session invalidate下调用,而不是所有的请求拦截
   */
  // response => {
  //   console.info(response)
  //   //   if(xmlhttprequest.getResponseHeader("content-type") == "text/html") {
  //   //     document.write(xmlhttprequest.responseText);
  //   //     document.close();
  //   // }
  //   //   store.dispatch('FedLogOut').then(() => {
  //   //     location.reload()
  //   //   })
  // },
  error => {
    // console.log(error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
