import { tr } from '@/utils/common/i18n'

export const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Validation */
export const validators = {
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || tr('valid.needEmail')
  },
  required: (v: any) => !!v || tr('valid.required'),
}
