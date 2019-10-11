import request from '@/utils/request'

export function getMailTemplates(data) {
  return request({
    url: '/mail/template/list',
    method: 'post',
    data
  })
}

export function createMailTemplates(data) {
  return request({
    url: '/mail/template/add',
    method: 'post',
    data
  })
}

export function updateMailTemplates(data) {
  return request({
    url: '/mail/template/update',
    method: 'post',
    data
  })
}
