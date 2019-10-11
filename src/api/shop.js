import request from '@/utils/request'

export function getShops(data) {
  return request({
    url: '/shop/list',
    method: 'post',
    data
  })
}

export function createShops(data) {
  return request({
    url: '/shop/add',
    method: 'post',
    data
  })
}

export function updateShops(data) {
  return request({
    url: '/shop/update',
    method: 'post',
    data
  })
}
