import Layout from '@/views/layout/Layout'
var rt = require('./menu.data')

// console.log(data.page.list)
export const routerTmpl = [
  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    name: 'sys',
    meta: {
      title: '系统功能',
      icon: 'example'
    },
    children: [
      { path: 'user', component: () => import('@/views/sys/user'), name: 'usermgr', meta: { title: '用户管理', noCache: true, icon: 'people' }},
      { path: 'user2', component: () => import('@/views/sys/user2'), name: 'rolemgr2', meta: { title: '用户管理2', noCache: true, icon: 'user' }},
      { path: 'menu', component: () => import('@/views/sys/menu'), name: 'menumgr', meta: { title: '菜单管理', noCache: true, icon: 'list' }},
      { path: 'line', component: () => import('@/views/sys/line'), name: 'rolemgr', meta: { title: '角色管理', noCache: true, icon: 'peoples' }}
    ]
  }
]

// rt.forEach(pel => {
//     if(pel.type===0) {
//         pel.
//     }
// })

var list = rt.page.list.filter(({ parentId }) => parentId === '0')

var addChildren = function(plist) {
  plist.forEach(pel => {
    rt.page.list.forEach(el => {
      if (pel.id === el.parentId) {
        if (pel.children) {
          pel.children.push(el)
        } else {
          pel.children = [el]
        }
      }
    })

    if (pel.children) {
      const spa = pel.children.filter(({ type }) => type === 0 || type === 1)
      if (spa.length > 0) {
        addChildren(spa)
      }
    }
    console.log('------------------------')
    console.log(pel)
  })
}

addChildren(list)

