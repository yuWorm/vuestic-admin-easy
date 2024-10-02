import type { RouteRecordRaw } from 'vue-router'

export interface RouteRecordMeta {
  title?: string
  icon?: string
  isShow?: boolean
  order?: number
  premissions?: string[]
}

export type RouteRecordWithMeta = RouteRecordRaw & {
  meta?: RouteRecordMeta
}
