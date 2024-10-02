import { isNullOrUndef } from '@/utils/common'

export interface StorageOption {
  storage: typeof localStorage | typeof sessionStorage
  prefixKey?: string
}

export class Storage {
  private storage: typeof localStorage | typeof sessionStorage
  private prefixKey?: string

  constructor(option: StorageOption) {
    this.storage = option.storage
    this.prefixKey = option.prefixKey
  }

  getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase()
  }

  set(key: string, value: any, expire: number | null = null) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: expire !== null ? Date.now() + expire * 1000 : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  get(key: string) {
    const { value } = this.getItem(key, {})
    return value
  }

  getItem(key: string, def: any = null): any {
    const val = this.storage.getItem(this.getKey(key))
    if (!val) return def
    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data
      if (isNullOrUndef(expire) || expire > Date.now()) {
        return { value, time }
      }
      this.remove(key)
      return def
    } catch (error) {
      this.remove(key)
      return def
    }
  }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }
}

export function createStorage({ prefixKey = '', storage = sessionStorage }) {
  return new Storage({ prefixKey, storage })
}
