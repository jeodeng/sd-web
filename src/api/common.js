import request from '@/utils/request'

export function getDics(key = '') {
  return request({
    url: `/dict/list/${key}`,
    method: 'get',
  })
}
