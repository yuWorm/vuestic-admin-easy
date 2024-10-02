export interface UserLoginForm {
  username: string
  password: string
}

export interface UserLoginResponse {
  access_token: string
  refresh_token: string
}
