import axios, { AxiosResponse } from 'axios'
import type { RequestConfig } from './types'
import { respReject, respResolve, reqReject, reqResolve } from './interceptors'
import { HttpResponse } from '@/utils/http/types'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export function createAxios(options = {}) {
  const defaultOptions = {
    timeout: 120000,
  }
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  service.interceptors.request.use(reqResolve, reqReject)
  service.interceptors.response.use(respResolve, respReject)
  return service
}

export const axiosInstance = createAxios({
  baseURL: import.meta.env.VITE_BASE_API,
})

// 添加格式化的类型注释
export const request = {
  get<T = any, R = HttpResponse<T>, D = any>(url: string, config?: RequestConfig<D>) {
    return axiosInstance.get<T, R, D>(url, config)
  },
  delete<T = any, R = HttpResponse<T>, D = any>(url: string, config?: RequestConfig<D>) {
    return axiosInstance.delete<T, R, D>(url, config)
  },
  post<T = any, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: RequestConfig<D>) {
    return axiosInstance.post<T, R, D>(url, data, config)
  },
  put<T = any, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: RequestConfig<D>) {
    return axiosInstance.put<T, R, D>(url, data, config)
  },
  patch<T = any, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: RequestConfig<D>) {
    return axiosInstance.patch<T, R, D>(url, data, config)
  },
}

window.request = axiosInstance
