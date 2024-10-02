import { success, failure } from './base'

interface LoginInterface {
  username: string
  password: string
}

const defaultUserInfo = {
  username: 'admin',
  password: '123456',
  email: 'admin@example.com',
  permissions: ['admin'],
}

export default [
  {
    url: '/api/user/login',
    method: 'POST',
    response: ({ body }: { body: LoginInterface }) => {
      console.error(body)
      if (body.username != defaultUserInfo.username) {
        return failure('用户不存在')
      }
      if (body.password != defaultUserInfo.password) {
        return failure('密码错误')
      }

      return success({
        access_token: Math.random().toString(36).substring(2, 64),
        refresh_token: Math.random().toString(36).substring(2, 64),
      })
    },
  },
  {
    url: '/api/user/detail',
    method: 'GET',
    response: () => {
      return success(defaultUserInfo)
    },
  },
]
