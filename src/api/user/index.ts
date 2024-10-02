import { request } from '@/utils/http'
import { UserLoginForm, UserLoginResponse } from '@/api/user/types'

export default {
  login(data: UserLoginForm) {
    return request.post<UserLoginResponse>('/user/login', data, { noNeedToken: true })
  },
}
