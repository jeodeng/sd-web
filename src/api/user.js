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

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
