import request from '@/utils/request'

export function getDics(key = '') {
  return request({
    url: `/dict/list/${key}`,
    method: 'get',
  })
}

export function getBanners() {
  return request({
    url: '/banner/img/list',
    method: 'POST',
    data: {
      status: 1,
    },
  })
}
