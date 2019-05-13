import {
  constantRouterMap
} from '@/router/index2'
// import dfdata from './default.data'
import Layout from '@/views/layout/Layout'

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./_import-' + process.env.NODE_ENV)

// /**
//  * 通过meta.role判断是否与当前用户权限匹配
//  * @param roles
//  * @param route
//  */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

// /**
//  * 递归过滤异步路由表，返回符合用户角色权限的路由表
//  * @param asyncRouterMap
//  * @param roles
//  */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, menu) {
      return new Promise(resolve => {
        const cleanData = arr => {
          const toDel = []
          // console.info(arr)
          if (arr instanceof Array) {
            arr.forEach(p => {
              if (p.meta.type !== 0 && p.meta.type !== 1) {
                toDel.push(p)
              } else if (p.children && p.children.length > 0) {
                cleanData(p.children)
              }
            })
          }
          toDel.forEach(ed => {
            const idx = arr.indexOf(ed)
            arr.splice(idx, 1)
          })
        }
        cleanData(menu)

        const parseData = function(arr) {
          console.info(arr)
          if (arr instanceof Array) {
            arr.forEach(p => {
              if (!p.path) {
                p.path = ''
              }
              if (p.parentId === 0) {
                // 页面
                if (p.meta.type === 1) {
                  p.children = [Object.assign({}, p)]
                  p.children[0].parentId = p.id
                  p.children[0].meta = Object.assign({}, p.meta)
                  p.name = p.name + '-parent'
                  p.meta.type = 0
                  p.redirect = p.path
                  p.path = ''
                } else if (p.children && p.children.length === 1) { // 菜单
                  p.alwaysShow = true
                  p.redirect = p.children[0].path
                }
                p.component = Layout
              }
              if (p.meta.type === 1) { // 页面
                // p.component = () => import(`@/views${p.path}`)
                // 不解析iframe标记
                if (!p.path.startsWith('/iframe__')) {
                  p.component = _import(p.path)
                }
              } else if (p.children && p.children.length > 0) { // 菜单
                parseData(p.children)
              }
            })
          }
        }
        console.info(menu)
        parseData(menu)

        const dashboard = [{
          path: '',
          component: Layout,
          redirect: 'dashboard',
          children: [{
            path: '/dashboard',
            component: () =>
              import('@/views/dashboard/index'),
            name: 'dashboard',
            meta: {
              title: 'dashboard',
              icon: 'dashboard',
              noCache: true
            }
          }]
        }]

        commit('SET_ROUTERS', dashboard.concat(menu)
          .concat(constantRouterMap))
        // .concat(asyncRouterMap))
        resolve()
      })
    }
  }
}

export default permission
