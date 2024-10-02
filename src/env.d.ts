/// <reference types="vite/client" />
import { AxiosInstance } from 'axios'

declare global {
  interface Window {
    request: AxiosInstance // 或者使用更具体的类型
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}
