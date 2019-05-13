const data = {
  'success': true,
  'page': {
    'pageNum': 1,
    'pageSize': 10,
    'count': false,
    'totalPage': 3,
    'totalCount': 21,
    'list': [
      {
        'id': '1',
        'parentId': '0',
        'name': '系统功能',
        'type': 0,
        'icon': 'example',
        'orderNum': 0,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58'
      },
      {
        'id': '2',
        'parentId': '0',
        'name': '系统管理',
        'type': 0,
        'icon': 'component',
        'orderNum': 1,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58'
      },
      {
        'id': '3',
        'parentId': '1',
        'name': '管理员列表',
        'url': 'sys/user.html',
        'type': 1,
        'icon': 'people',
        'orderNum': 1,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58',
        'parentName': '系统功能'
      },
      {
        'id': '4',
        'parentId': '1',
        'name': '角色管理',
        'url': 'sys/role.html',
        'type': 1,
        'icon': 'peoples',
        'orderNum': 2,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58',
        'parentName': '系统功能'
      },
      {
        'id': '5',
        'parentId': '1',
        'name': '菜单管理',
        'url': 'sys/menu.html',
        'type': 1,
        'icon': 'list',
        'orderNum': 3,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58',
        'parentName': '系统功能'
      },
      {
        'id': '6',
        'parentId': '2',
        'name': 'SQL监控',
        'url': 'druid/sql.html',
        'type': 1,
        'icon': 'eye',
        'orderNum': 4,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58',
        'parentName': '系统管理'
      },
      {
        'id': '27',
        'parentId': '1',
        'name': '数据字典',
        'url': 'sys/config.html',
        'perms': 'sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete',
        'type': 1,
        'icon': 'table',
        'orderNum': 6,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58',
        'parentName': '系统功能'
      },
      {
        'id': '29',
        'parentId': '1',
        'name': '系统日志',
        'url': 'sys/log.html',
        'perms': 'sys:log:list',
        'type': 1,
        'icon': 'documentation',
        'orderNum': 7,
        'createDate': '2018-04-23 06:28:58',
        'modifyUserid': '1',
        'modifyDate': '2018-07-25 16:53:02',
        'parentName': '系统功能'
      },
      {
        'id': '30',
        'parentId': '2',
        'name': 'API文档',
        'url': 'swagger-ui.html',
        'type': 1,
        'icon': 'documentation',
        'orderNum': 10,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58',
        'parentName': '系统管理'
      },
      {
        'id': '15',
        'parentId': '3',
        'name': '查看',
        'perms': 'sys:user:list,sys:user:info',
        'type': 2,
        'orderNum': 0,
        'createDate': '2018-04-23 06:28:58',
        'modifyDate': '2018-04-23 06:28:58',
        'parentName': '管理员列表'
      }
    ]
  },
  'timestamp': '1533866197433'
}

// export default data
module.exports = data
