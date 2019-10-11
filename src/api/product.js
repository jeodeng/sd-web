import request from '@/utils/request'

export function getProducts(data) {
  return request({
    url: '/product/list',
    method: 'post',
    data
  })
}

export function getProductsRecords(data) {
  return request({
    url: '/take/order/list',
    method: 'post',
    data
  })
}

export function createProducts(data) {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}

export function updateProducts(data) {
  return request({
    url: '/product/update',
    method: 'post',
    data
  })
}
