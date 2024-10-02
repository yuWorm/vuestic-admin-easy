import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

export interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
  noNeedToken?: boolean
  noNeedTip?: boolean
  headers?: AxiosRequestHeaders
}

export interface HttpResponse<T = any> {
  code: number
  message?: string
  data: T
}

export interface AxiosHttpResponse<T = any, D = any> extends AxiosResponse<T, D> {
  config: RequestConfig<D>
}
