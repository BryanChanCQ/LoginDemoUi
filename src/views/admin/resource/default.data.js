const data = [
  {
    'id': 1,
    'parentId': 0,
    'name': 'sys',
    'meta': {
      'title': '系统功能',
      'icon': 'example',
      'type': 0
    },
    'children': [
      {
        'id': 3,
        'parentId': 1,
        'name': 'UserMgr',
        'path': '/sys/user/index',
        'meta': {
          'title': '管理员列表',
          'icon': 'user',
          'perms': '',
          'type': 1
        },
        'children': [
          {
            'id': 58,
            'parentId': 3,
            'name': 'sys-uread',
            'meta': {
              'title': '查看',
              'icon': 'list',
              'perms': 'sys:user:list,sys:user:info',
              'type': 2
            }
          }
        ]
      },
      {
        'id': 4,
        'parentId': 1,
        'name': 'Role',
        'path': '/sys/role/index',
        'meta': {
          'title': '角色权限',
          'icon': 'peoples',
          'perms': '',
          'type': 1
        }
      },
      {
        'id': 5,
        'parentId': 1,
        'name': 'Configdict',
        'path': '/sys/configdict/index',
        'meta': {
          'title': '数据字典',
          'icon': 'icon',
          'perms': 'sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete',
          'type': 1
        }
      },
      {
        'id': 16,
        'parentId': 1,
        'name': 'Auditlog',
        'path': '/sys/auditlog/index',
        'meta': {
          'title': '操作日志',
          'icon': 'log',
          'perms': 'sys:config:list,sys:config:delete',
          'type': 1
        }
      }
    ]
  },
  {
    'id': 2,
    'parentId': 0,
    'name': 'sysm',
    'meta': {
      'title': '系统管理',
      'icon': 'system',
      'type': 0
    },
    'children': [
      {
        'id': 6,
        'parentId': 2,
        'name': 'Resmgr',
        'path': '/sys/resource/index',
        'meta': {
          'title': '资源配置',
          'icon': 'zonghe',
          'perms': '',
          'type': 1
        }
      },
      {
        'id': 29,
        'parentId': 1,
        'name': 'iframe1',
        'path': '/iframe__https%3a%2f%2fcn.vuejs.org',
        'meta': {
          'title': 'Iframe示例',
          'icon': 'guide',
          'perms': 'sys:con',
          'type': 1
        }
      },
      {
        'id': 30,
        'parentId': 1,
        'name': 'iframe2',
        'path': '/iframe__http%3A%2F%2Fwww.jsons.cn%2Furlencode%2F',
        'meta': {
          'title': 'Iframe示例2',
          'icon': 'shouye',
          'perms': 'sys:con',
          'type': 1
        }
      },
      {
        'id': 31,
        'parentId': 1,
        'name': 'iframe3',
        'path': '/iframe__http%3A%2F%2Felement-cn.eleme.io%2F%23%2Fzh-CN%2Fcomponent%2Ficon',
        'meta': {
          'title': 'Iframe示例3',
          'icon': 'daohang',
          'perms': 'sys:con',
          'type': 1
        }
      }
    ]
  },
  {
    'id': 32,
    'parentId': 0,
    'name': 'lineChart',
    'path': '/charts/line',
    'meta': {
      'title': '监控页面',
      'icon': 'bug',
      'type': 1,
      'perms': 'xxx'
    }
  }
]

// export default data
module.exports = data
