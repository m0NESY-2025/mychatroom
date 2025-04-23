import { defineStore } from 'pinia'
import defaultImg from '@/assets/img/Me.jpg'

export const useUserStore = defineStore('user', {
  state: () => ({
    avatarUrl: defaultImg
  }),
  actions: {
    updateAvatar(newAvatarUrl) {
      this.avatarUrl = newAvatarUrl
    }
  }
}) 