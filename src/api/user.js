import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout(userId) {
  return request({
    url: `/user/loginOut/${userId}`,
    method: 'post',
    data: { userId }
  })
}

export function getUsers(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function createUsers(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function updateUsers(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
