interface MockResponse {
  code: number
  message: string
  data?: any
}

export function success(data: any, code = 200, message = '操作成功'): MockResponse {
  return {
    code: code,
    message: message,
    data: data,
  }
}

export function failure(msg: string, code = 400): MockResponse {
  return {
    code: code,
    message: msg,
  }
}
