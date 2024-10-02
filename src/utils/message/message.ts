import { useToast } from 'vuestic-ui'

const { notify } = useToast()

interface MessageOption {
  color: 'primary' | 'success' | 'warning' | 'danger' | string
  message: string
}

export const Message = {
  show(option: MessageOption) {
    notify({ ...option })
  },
  success(message: string) {
    this.show({
      message: message,
      color: 'success',
    })
  },
  error(message: string) {
    this.show({
      message: message,
      color: 'danger',
    })
  },
  warning(message: string) {
    this.show({
      message: message,
      color: 'warning',
    })
  },
  info(message: string) {
    this.show({
      message: message,
      color: 'primary',
    })
  },
}
