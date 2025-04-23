<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Talk from './chat/Talk.vue'
import socketIO from '@/utils/socket'

const props = defineProps({
  bgColor: String,
  avatarUrl: String  // 添加avatarUrl prop
})

// 根据主题计算样式
const themeStyles = computed(() => ({
  backgroundColor: props.bgColor === 'white' ? '#f7f7f7' : 'rgb(39, 42, 55)',
  color: props.bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff'
}))

const containerStyles = computed(() => ({
  backgroundColor: props.bgColor === 'white' ? 'rgba(39, 42, 55, 0.05)' : 'rgba(255, 255, 255, 0.05)'
}))

// 在线用户列表
const onlineUsers = ref([])

// 当前用户信息（使用传入的头像）
const currentUser = {
  id: 'user_' + Date.now(),
  name: '用户' + Math.floor(Math.random() * 1000),
  avatar: props.avatarUrl // 使用传入的头像URL
}

// 监听WebSocket事件
const setupSocketListeners = () => {
  // 监听聊天消息
  socketIO.onChatMessage((message) => {
    console.log('收到消息:', message)
  })

  // 监听系统消息
  socketIO.onSystemMessage((message) => {
    console.log('系统消息:', message.content)
  })

  // 监听在线用户列表更新
  socketIO.onOnlineUsers((users) => {
    onlineUsers.value = users
  })

  // 监听头像更新
  socketIO.onAvatarUpdate(({ userId, newAvatarUrl }) => {
    // 如果是当前用户的头像更新，更新当前用户头像
    if (userId === currentUser.id) {
      currentUser.avatar = newAvatarUrl
    }
    // 更新在线用户列表中的头像
    onlineUsers.value = onlineUsers.value.map(user => {
      if (user.id === userId) {
        return { ...user, avatar: newAvatarUrl }
      }
      return user
    })
  })
}

// 监听头像更新
const handleAvatarUpdate = (newAvatarUrl) => {
  currentUser.avatar = newAvatarUrl
  socketIO.updateAvatar(newAvatarUrl)
}

// 监听props.avatarUrl的变化
watch(() => props.avatarUrl, (newAvatarUrl) => {
  if (newAvatarUrl && currentUser) {
    currentUser.avatar = newAvatarUrl
    socketIO.updateAvatar(newAvatarUrl)
  }
})

// 组件挂载时连接WebSocket
onMounted(() => {
  socketIO.connect()
  socketIO.joinRoom(currentUser)
  setupSocketListeners()
})

// 组件卸载时断开WebSocket
onUnmounted(() => {
  socketIO.removeAllListeners()
  socketIO.disconnect()
})
</script>

<template>
  <div class="chat-container" :style="themeStyles">
    <div class="chat-layout">
      <!-- 左侧在线用户列表 -->
      <div class="users-section" :style="containerStyles">
        <div class="users-header">
          <h2 :style="{ color: props.bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff' }">在线用户 ({{ onlineUsers.length }})</h2>
        </div>
        <div class="users-list">
          <div 
            v-for="user in onlineUsers" 
            :key="user.id"
            class="user-item"
          >
            <div class="user-avatar">
              <img :src="user.avatar">
              <div class="status-dot online"></div>
            </div>
            <div class="user-info">
              <div class="user-name" :style="{ color: props.bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff' }">
                {{ user.name }}
                <span v-if="user.id === currentUser.id">(我)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧聊天区域 -->
      <div class="chat-section" :style="containerStyles">
        <Talk 
          :currentUser="currentUser"
          :bgColor="props.bgColor"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  height: 80vh;
  padding: 20px;
}

.chat-layout {
  height: 100%;
  display: flex;
  gap: 20px;
}

.users-section {
  width: 250px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.users-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.users-header h2 {
  margin: 0;
  color: #fff;
  font-size: 20px;
}

.users-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
}

.user-avatar {
  position: relative;
  width: 40px;
  height: 40px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #666;
}

.status-dot.online {
  background-color: rgb(144, 225, 80);
}

.user-info {
  flex: 1;
  margin-left: 10px;
}

.user-name {
  color: #fff;
  font-size: 14px;
}

.chat-section {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>