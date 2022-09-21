const TokenKey = 'Admin-Token'
const TokenLoginKey = 'Admin-login-Token'
const UserIdKey = 'Admin-userId'
const ClientIdKey = 'Admin-Client-Id'
const MobileKey = 'Mobile-Id'
export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getLoginToken() {
  return localStorage.getItem(TokenLoginKey)
}

export function setLoginToken(token) {
  return localStorage.setItem(TokenLoginKey, token)
}

export function removeLoginToken() {
  return localStorage.removeItem(TokenLoginKey)
}

export function getUserId() {
  return localStorage.getItem(UserIdKey)
}

export function setUserId(userId) {
  return localStorage.setItem(UserIdKey, userId)
}

export function removeUserId() {
  return localStorage.removeItem(UserIdKey)
}

export function getClientId() {
  return localStorage.getItem(ClientIdKey)
}

export function setClientId(clientId) {
  return localStorage.setItem(ClientIdKey, clientId)
}

export function removeClientId() {
  return localStorage.removeItem(ClientIdKey)
}

export function getMobile() {
  return localStorage.getItem(MobileKey)
}

export function setMobile(mobile) {
  return localStorage.setItem(MobileKey, mobile)
}

export function removeMobile() {
  return localStorage.removeItem(MobileKey)
}
