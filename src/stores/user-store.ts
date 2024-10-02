import { defineStore } from 'pinia'
import userApi from '@/api/user'
import { saveAccessToken, removeToken } from '@/utils/auth'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: 'Vasili Savitski',
      email: 'vasili@gmail.com',
    }
  },

  actions: {
    changeUserName(userName: string) {
      this.userName = userName
    },
    async login(username: string, password: string) {
      const { data } = await userApi.login({ username, password })
      saveAccessToken(data.access_token)
    },
    async logout() {
      removeToken()
    },
  },
})
