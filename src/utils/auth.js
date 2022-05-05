import Cookies from 'js-cookie'

const TokenKey = 'wisdom_site_token'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.clear(TokenKey)
}
export function removeResult() {
  return Cookies.remove('loginInfo')
}
export function getName() {
  return Cookies.get('name')
}
export function setName(name) {
  return Cookies.set('name', name)
}
export function getOrgId() {
  return Cookies.get('orgId')
}
export function setOrgId(orgId) {
  return Cookies.set('orgId', orgId)
}
export function getResult() {
  return Cookies.get('loginInfo')
}
export function setResult(loginInfo) {
  return Cookies.set('loginInfo', loginInfo)
}

