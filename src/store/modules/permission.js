import {
  constantRouterMap
} from '@/router'

import {
  getMenuByRoleIds
} from '@/api/login'

import Layout from '@/views/layout/Layout'

const _import = require('./_import-' + process.env.NODE_ENV)

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
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
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        const ids = []
        for (let i = 0; i < data.length; ++i) {
          ids.push(data[i].id)
        }
        console.info(ids)
        getMenuByRoleIds(ids).then(response => {
          // if (!response.data || !response.data.success) { // 由于mockjs 不支持自定义状态码只能这样hack
          //   reject('error')
          // }
          console.info('getMenuByRoleIds:')
          let menus = []
          parseMenus(menus, response.data.data, 0)
          menus = concatDashBoard(menus)
          console.info(menus)
          const page404 = { path: '*', redirect: '/404', hidden: true }
          menus.push(page404)
          debugger
          commit('SET_ROUTERS', menus)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

function parseMenus(menus, arr, count) {
  count += 1
  console.info('目录解析')
  console.info(menus)
  console.info(arr)
  const notAddedMenus = []
  for (let i = 0; i < arr.length; ++i) {
    // if (arr[i].parentId === 0) {
    let dir = {}
    // 目录
    if (arr[i].type === 0) {
      if (!arr[i].hasOwnProperty('converted')) {
        dir.path = ''
        dir.id = arr[i].id
        dir.converted = true
        dir.type = 0
        dir.parentId = arr[i].parentId
        dir.orderNum = arr[i].orderNum
        dir.name = arr[i].name
        dir.meta = {
          title: arr[i].name,
          icon: arr[i].icon
        }
        dir.children = []
        dir.alwaysShow = true
      } else {
        dir = arr[i]
      }
      addMenu(dir, menus, notAddedMenus)
    } else {
      let page = {}
      if (!arr[i].hasOwnProperty('converted')) {
        page.converted = true
        if (arr[i].parentId === 0) {
          page.path = ''
          page.id = arr[i].id
          page.type = 1
          page.parentId = arr[i].parentId
          page.name = arr[i].name
          page.redirect = 'noredirect'
          page.component = Layout
          page.orderNum = arr[i].orderNum
          console.info(arr[i].url)
          let component = null
          try {
            component = _import(arr[i].url)
          } catch (e) {
            return
          }
          page.children = [{
            component: component,
            path: arr[i].url,
            name: arr[i].name,
            meta: {
              title: arr[i].name,
              icon: arr[i].icon
            }
          }]
        } else {
          console.info(arr[i])
          page.path = arr[i].url
          page.id = arr[i].id
          page.type = 1
          page.parentId = arr[i].parentId
          // page.component = _import(arr[i].url)
          let component = null
          try {
            component = _import(arr[i].url)
          } catch (e) {
            return
          }
          page.component = component
          page.orderNum = arr[i].orderNum
          page.meta = {
            title: arr[i].name,
            icon: arr[i].icon
          }
        }
      } else {
        page = arr[i]
      }
      addMenu(page, menus, notAddedMenus)
    }
  }
  // }
  if (notAddedMenus.length > 0) {
    if (count === 5) {
      return
    }
    let childrenMenus = []
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].hasOwnProperty('children')) {
        childrenMenus = childrenMenus.concat(menus[i].children)
      }
    }
    // const ids = []
    // for (let i = 0; i < childrenMenus.length; i++) {
    //   ids.push(childrenMenus[i].id)
    // }
    // for (let i = 0; i < notAddedMenus.length; i++) {
    //   ids.push(notAddedMenus[i].id)
    // }
    // const delMenus = []
    // for (let i = 0; i < notAddedMenus.length; i++) {
    //   if (ids.indexOf(notAddedMenus[i].parentId) === -1) {
    //     delMenus.push(notAddedMenus[i].id)
    //   }
    // }
    // notAddedMenus = notAddedMenus.filter(function(i) { return delMenus.indexOf(i.id) !== -1 })
    parseMenus(childrenMenus, notAddedMenus, count)
  }
}

function addMenu(menu, menus, notAddedMenus) {
  // 顶层目录
  if (menu.parentId === 0) {
    if (menu.name === '部署详情') {
      menu.hidden = true
    }
    menu.component = Layout
    menus.push(menu)
  } else {
    let i = 0
    for (; i < menus.length; ++i) {
      // parent已经加入到菜单
      debugger
      if (menu.parentId === menus[i].id) {
        menus[i].children.push(menu)
        break
      }
    }
    if (i === menus.length) {
      notAddedMenus.push(menu)
    }
  }
}

function concatDashBoard(menus) {
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
  return dashboard.concat(menus)
}

export default permission
