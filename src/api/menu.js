import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/menu/list',
    method: 'get',
    params: query
  })
}

export function createMenu(data) {
  return request.post('/BaseController/addMenu', data)
}

export function updateMenu(data) {
  return request.post('/admin/api/menu/updateMenubyId', data)
}

export function deleteMenu(data) {
  return request({
    url: '/menu/delete',
    method: 'post',
    data
  })
}
