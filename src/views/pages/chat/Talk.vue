<script setup>

import { ref } from 'vue'
const props = defineProps({
  friend: Object,
  bgColor: String
})

// 模拟聊天记录数据
const chatHistories = {
  1: [
    { id: 1, type: 'friend', content: '你好啊！', time: '14:20' },
    { id: 2, type: 'me', content: '你好！最近怎么样？', time: '14:21' },
    { id: 3, type: 'friend', content: '还不错，在学Vue', time: '14:22' }
  ],
  2: [
    { id: 1, type: 'friend', content: '明天见！', time: '昨天' },
    { id: 2, type: 'me', content: '好的，明天见！', time: '昨天' }
  ]
}

// 获取当前好友的聊天记录
const getCurrentChatHistory = () => {
  return props.friend ? chatHistories[props.friend.id] : []
}
</script>

<template>
  <div class="talk-container">
    <div class="chat-header">
      <div class="friend-info">
        <img :src="friend?.avatar" :alt="friend?.name">
        <span class="friend-name" :style="{ color: bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff' }">{{ friend?.name }}</span>
      </div>
    </div>
    <div class="messages-container">
      <div 
        v-for="msg in getCurrentChatHistory()" 
        :key="msg.id"
        class="message"
        :class="{ 'message-mine': msg.type === 'me' }"
      >
        <div class="message-content">
          <div class="message-text" :style="msg.type === 'me' ? {} : { backgroundColor: bgColor === 'white' ? 'rgba(39, 42, 55, 0.1)' : 'rgba(255, 255, 255, 0.1)', color: bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff' }">{{ msg.content }}</div>
          <div class="message-time" :style="{ color: bgColor === 'white' ? 'rgba(39, 42, 55, 0.4)' : 'rgba(255, 255, 255, 0.4)' }">{{ msg.time }}</div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <textarea 
        class="message-input" 
        placeholder="输入消息..." 
        rows="3"
        :style="{ 
          backgroundColor: bgColor === 'white' ? 'rgba(39, 42, 55, 0.05)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: bgColor === 'white' ? 'rgba(39, 42, 55, 0.1)' : 'rgba(255, 255, 255, 0.1)',
          color: bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff'
        }"
      ></textarea>
      <button class="send-btn">发送</button>
    </div>
  </div>
</template>

<style scoped>
.talk-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.friend-info {
  display: flex;
  align-items: center;
}

.friend-info img {
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
</style>