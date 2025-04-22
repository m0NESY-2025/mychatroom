<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HeadImg from '@/assets/img/Me.jpg'

const router = useRouter()
const route = useRoute()

// 模拟好友列表数据
const friendsList = ref([
  {
    id: 1,
    name: '张三',
    avatar: HeadImg,
    lastMessage: '还不错，在学Vue',
    lastTime: '14:20',
    online: true
  },
  {
    id: 2,
    name: '李四',
    avatar: HeadImg,
    lastMessage: '好的,明天见!',
    lastTime: '昨天',
    online: false
  }
])

const selectFriend = (friendId) => {
  router.push(`/chat/talk/${friendId}`)
}

const isActive = (friendId) => {
  return route.params.id === friendId.toString()
}
</script>

<template>
  <div class="friend-container">
    <div class="friend-header">
      <h2>消息列表</h2>
    </div>
    <div class="friend-list">
      <div 
        v-for="friend in friendsList" 
        :key="friend.id"
        class="friend-item"
        :class="{ 'active': isActive(friend.id) }"
        @click="selectFriend(friend.id)"
      >
        <div class="friend-avatar">
          <img :src="friend.avatar" :alt="friend.name">
          <div class="status-dot" :class="{ 'online': friend.online }"></div>
        </div>
        <div class="friend-info">
          <div class="friend-name">{{ friend.name }}</div>
          <div class="last-message">{{ friend.lastMessage }}</div>
        </div>
        <div class="last-time">{{ friend.lastTime }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friend-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.friend-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.friend-header h2 {
  margin: 0;
  color: #fff;
  font-size: 24px;
}

.friend-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.3s;
  margin-bottom: 10px;
}

.friend-item:hover {
  background: rgba(29, 144, 245, 0.1);
}

.friend-item.active {
  background: rgba(29, 144, 245, 0.2);
}

.friend-avatar {
  position: relative;
  width: 50px;
  height: 50px;
}

.friend-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #666;
  border: 2px solid rgb(39, 42, 55);
}

.status-dot.online {
  background-color: rgb(144, 225, 80);
}

.friend-info {
  flex: 1;
  margin-left: 15px;
}

.friend-name {
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}

.last-message {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.last-time {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  min-width: 60px;
  text-align: right;
}
</style>