import { createStorage, Storage } from './storage'

const prefixKey = 'VUESTIC_ADMIN_EASY_'

export const createLocalStorage = function (option: { prefixKey?: string } = {}): Storage {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: localStorage,
  })
}

export const createSessionStorage = function (option: { prefixKey?: string } = {}): Storage {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: sessionStorage,
  })
}

export const lStorage: Storage = createLocalStorage({ prefixKey })

export const sStorage: Storage = createSessionStorage({ prefixKey })
