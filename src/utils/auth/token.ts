import { lStorage } from '@/utils/storage'

const ACCESS_TOKEN_CODE = 'access_token'
const REFRESH_TOKEN_CODE = 'refresh_token'
const DURATION = 6 * 60 * 60

export function getAccessToken(): string {
  return lStorage.get(ACCESS_TOKEN_CODE)
}

export function getRefreshToken(): string {
  return lStorage.get(REFRESH_TOKEN_CODE)
}

export function setToken(TOKEN_CODE: string, token: string) {
  lStorage.set(TOKEN_CODE, token, DURATION)
}

export function removeToken() {
  lStorage.remove(ACCESS_TOKEN_CODE)
  lStorage.remove(REFRESH_TOKEN_CODE)
}

/**
 * 存储tokens
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export function saveTokens(accessToken: string, refreshToken: string) {
  lStorage.set(ACCESS_TOKEN_CODE, accessToken)
  lStorage.set(REFRESH_TOKEN_CODE, refreshToken)
}

/**
 * 存储access_token
 * @param {string} accessToken
 */
export function saveAccessToken(accessToken: string) {
  lStorage.set(ACCESS_TOKEN_CODE, accessToken)
}
