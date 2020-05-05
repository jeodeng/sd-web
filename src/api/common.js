import request from '@/utils/request'

export function postInformation(data) {
  return request({
    url: '/user/adress/add',
    method: 'POST',
    data,
  })
}
