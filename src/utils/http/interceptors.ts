import { Message } from '@/utils/message'
import { AxiosHttpResponse, HttpResponse, RequestConfig } from '@/utils/http/types'

import { getAccessToken } from '@/utils/auth'
import { resolveResError } from '@/utils/http/utils'
import type { AxiosResponse } from 'axios'

export function reqResolve(config: RequestConfig): any {
  // 不需要token则不添加
  if (config?.noNeedToken) {
    return config
  }

  const token = getAccessToken()
  // 无token直接跳401
  if (!token) {
    return Promise.reject({ code: 401, message: '登录已过期，请重新登录！' })
  }

  /**
   * * 加上 token
   * ! 认证方案: JWT Bearer
   */
  config.headers!.Authorization = config.headers?.Authorization || 'Bearer ' + token
  return config
}

export function reqReject(error: any) {
  return Promise.reject(error)
}

export function respResolve(response: AxiosResponse<HttpResponse>) {
  const { data, status, config, statusText } = response as AxiosHttpResponse
  if (data?.code !== 200) {
    const code = data?.code ?? status

    /** 根据code处理对应的操作，并返回处理后的message */
    const message = resolveResError(code, data?.message ?? statusText)

    /** 需要错误提醒 */
    !config.noNeedTip && Message.error(message)
    return Promise.reject({ code, message, error: data || response })
  }

  return Promise.resolve(data)
}

export function respReject(error: any) {
  if (!error || !error.response) {
    const code = error?.code
    /** 根据code处理对应的操作，并返回处理后的message */
    const message = resolveResError(code, error.message)
    Message.error(message)
    return Promise.reject({ code, message, error })
  }
  const { data, status, config } = error.response
  const code = data?.code ?? status
  const message = resolveResError(code, data?.message ?? error.message)
  /** 需要错误提醒 */
  !config?.noNeedTip && Message.error(message)
  return Promise.reject({ code, message, error: error.response?.data || error.response })
}
