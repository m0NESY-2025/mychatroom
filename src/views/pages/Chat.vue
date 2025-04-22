<script setup>
import { ref, computed } from 'vue'
import JackImg from '@/assets/img/Jack.jpg'
import RoseImg from '@/assets/img/Rose.jpg'
import Talk from './chat/Talk.vue'

const props = defineProps({
  bgColor: String
})

// 根据主题计算样式
const themeStyles = computed(() => ({
  backgroundColor: props.bgColor === 'white' ? '#f7f7f7' : 'rgb(39, 42, 55)',
  color: props.bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff'
}))

const containerStyles = computed(() => ({
  backgroundColor: props.bgColor === 'white' ? 'rgba(39, 42, 55, 0.05)' : 'rgba(255, 255, 255, 0.05)'
}))

// 模拟好友列表数据
const friendsList = ref([
  {
    id: 1,
    name: 'Jack',
    avatar: JackImg,
    lastMessage: '还不错，在学Vue',
    lastTime: '14:20',
    online: true
  },
  {
    id: 2,
    name: 'Rose',
    avatar: RoseImg,
    lastMessage: '好的，明天见！',
    lastTime: '昨天',
    online: true
  }
])

// 当前选中的好友ID
const currentFriendId = ref(null)

// 选择好友
const selectFriend = (friendId) => {
  currentFriendId.value = friendId
}

// 获取当前选中的好友信息
const getCurrentFriend = () => {
  return friendsList.value.find(friend => friend.id === currentFriendId.value)
}
</script>

<template>
  <div class="chat-container" :style="themeStyles">
    <div class="chat-layout">
      <!-- 左侧好友列表 -->
      <div class="friend-section" :style="containerStyles">
        <div class="friend-header">
          <h2 :style="{ color: props.bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff' }">消息列表</h2>
        </div>
        <div class="friend-list">
          <div 
            v-for="friend in friendsList" 
            :key="friend.id"
            class="friend-item"
            :class="{ 'active': friend.id === currentFriendId }"
            @click="selectFriend(friend.id)"
          >
            <div class="friend-avatar">
              <img :src="friend.avatar">
              <div class="status-dot" :class="{ 'online': friend.online }"></div>
            </div>
            <div class="friend-info">
              <div class="friend-name" :style="{ color: props.bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff' }">{{ friend.name }}</div>
              <div class="last-message" :style="{ color: props.bgColor === 'white' ? 'rgba(39, 42, 55, 0.6)' : 'rgba(255, 255, 255, 0.6)' }">{{ friend.lastMessage }}</div>
            </div>
            <div class="last-time" :style="{ color: props.bgColor === 'white' ? 'rgba(39, 42, 55, 0.4)' : 'rgba(255, 255, 255, 0.4)' }">{{ friend.lastTime }}</div>
          </div>
        </div>
      </div>
      
      <!-- 右侧聊天区域 -->
      <div class="chat-section" :style="containerStyles">
        <Talk 
          v-if="currentFriendId"
          :friend="getCurrentFriend()"
          :bgColor="props.bgColor"
        />
        <div v-else class="empty-chat">
          <div class="empty-content">
            <i class="iconfont icon-xinxi" :style="{ color: props.bgColor === 'white' ? 'rgba(39, 42, 55, 0.4)' : 'rgba(255, 255, 255, 0.4)' }"></i>
            <p :style="{ color: props.bgColor === 'white' ? 'rgba(39, 42, 55, 0.4)' : 'rgba(255, 255, 255, 0.4)' }">选择一个好友开始聊天</p>
          </div>
        </div>
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

.friend-section {
  width: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
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
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #666;
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

.chat-section {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header .friend-info {
  display: flex;
  align-items: center;
}

.chat-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  margin-bottom: 20px;
  display: flex;
}

.message-mine {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
}

.message-text {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 15px;
  color: #fff;
}

.message-mine .message-text {
  background: rgb(29, 144, 245);
}

.message-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 5px;
  text-align: right;
}

.input-area {
  display: flex;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.message-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  resize: none;
}

.message-input:focus {
  outline: none;
  border-color: rgb(29, 144, 245);
}

.send-btn {
  float: right;
  margin-left: 10px;
  margin-top: 10px;
  height: 40px;
  width: 100px;
  padding: 8px 20px;
  background: rgb(29, 144, 245);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.send-btn:hover {
  background: rgb(24, 119, 204);
}

.empty-chat {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-content {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
}

.empty-content i {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-content p {
  font-size: 16px;
}
</style>