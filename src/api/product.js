import request from '@/utils/request'

export function getProducts(data) {
  return request({
    url: '/product/list',
    method: 'post',
    data
  })
}

export function getValidProducts(data) {
  const { userId, productId } = data;
  return request({
    url: `/product/verification/${userId}/${productId}`,
    method: 'post',
    data
  })
}

