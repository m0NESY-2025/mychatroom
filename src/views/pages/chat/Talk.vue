<script setup>
import { ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  friend: Object,
  bgColor: String
})
const emit = defineEmits(['lastMessage'])
// 消息输入框的内容
const messageInput = ref('')
// 获取消息容器的引用
const messagesContainer = ref(null)

// 模拟聊天记录数据
const chatHistories = ref({
  1: [
    { id: 1, type: 'friend', content: '你好啊！', time: '14:20' },
    { id: 2, type: 'me', content: '你好！最近怎么样？', time: '14:21' },
    { id: 3, type: 'friend', content: '还不错，在学Vue', time: '14:22' }
  ],
  2: [
    { id: 1, type: 'friend', content: '明天见！', time: '昨天' },
    { id: 2, type: 'me', content: '好的，明天见！', time: '昨天' }
  ]
})

// 获取当前好友的聊天记录
const getCurrentChatHistory = () => {
  return props.friend ? chatHistories.value[props.friend.id] : []
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight)
}

// 发送消息
const sendMessage = () => {
  if (!messageInput.value.trim()) 
  return ElMessage.error('消息不能为空')// 如果消息为空，不发送
  
  const currentTime = new Date()
  const timeStr = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`
  
  // 创建新消息
  const newMessage = {
    id: Date.now(), // 使用时间戳作为临时ID
    type: 'me',
    content: messageInput.value,
    time: timeStr
  }
  
  // 将新消息添加到聊天记录中
  chatHistories.value[props.friend.id].push(newMessage)
  
  // 将最新消息传递给父组件
  emit('lastMessage', {
    content: messageInput.value,
    time: timeStr
  })
  
  // 清空输入框
  messageInput.value = ''
  
  // 滚动到底部
  scrollToBottom()
}
// 处理回车发送
const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
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
    <div class="messages-container" ref="messagesContainer">
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
        v-model="messageInput"
        @keypress="handleKeyPress"
        :style="{ 
          backgroundColor: bgColor === 'white' ? 'rgba(39, 42, 55, 0.05)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: bgColor === 'white' ? 'rgba(39, 42, 55, 0.1)' : 'rgba(255, 255, 255, 0.1)',
          color: bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff'
        }"
      ></textarea>
      <button class="send-btn" @click="sendMessage">发送</button>
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
/* 添加滚动条样式 */
/* -webkit浏览器自带的滚动条样式 */
.messages-container::-webkit-scrollbar {
  width: 5px;  /* 滚动条宽度 */
}

.messages-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);  /* 滚动条轨道背景色 */
  border-radius: 5px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: rgb(29, 144, 245);  /* 滚动条颜色，使用与发送按钮相同的蓝色 */
  border-radius: 5px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: rgb(24, 119, 204);  /* 鼠标悬停时的颜色 */
}
</style>