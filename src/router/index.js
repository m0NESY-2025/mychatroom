import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Setting from '../views/pages/Setting.vue'
import Chat from '../views/pages/Chat.vue'
import FriendList from '../views/pages/chat/FriendList.vue'
import Talk from '../views/pages/chat/Talk.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      // 重定向到chat
      redirect: '/chat',
      children: [
        {
          path: '/setting',
          name: 'Setting',
          component: Setting,
        },
        {
          path: '/chat',
          name: 'Chat',
          component: Chat,
          children: [
            {
              path: '',
              name: 'FriendList',
              component: FriendList
            },
            {
              path: 'talk/:id',
              name: 'Talk',
              component: Talk
            }
          ]
        }
      ],
    },
  ],
})

export default router