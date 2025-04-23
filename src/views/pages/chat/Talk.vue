<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import socketIO from '@/utils/socket'

const props = defineProps({
  currentUser: Object,
  bgColor: String
})

// 消息输入框的内容
const messageInput = ref('')
// 获取消息容器的引用
const messagesContainer = ref(null)

// 聊天消息列表
const messages = ref([])

// 监听新消息
onMounted(() => {
  socketIO.onChatMessage((message) => {
    messages.value.push({
      id: message.timestamp,
      type: message.sender.id === props.currentUser.id ? 'me' : 'other',
      content: message.content,
      sender: message.sender,
      time: new Date(message.timestamp).toLocaleTimeString()
    })
    scrollToBottom()
  })

  // 监听系统消息
  socketIO.onSystemMessage((message) => {
    messages.value.push({
      id: message.timestamp,
      type: 'system',
      content: message.content,
      time: new Date(message.timestamp).toLocaleTimeString()
    })
    scrollToBottom()
  })
})

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 发送消息
const sendMessage = () => {
  if (!messageInput.value.trim()) 
    return ElMessage.error('消息不能为空')
  
  // 通过WebSocket发送消息
  socketIO.sendMessage(messageInput.value)
  
  // 清空输入框
  messageInput.value = ''
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
      <div class="room-info">
        <h3 :style="{ color: bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff' }">聊天室</h3>
      </div>
    </div>
    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="msg in messages" 
        :key="msg.id"
        class="message"
        :class="{ 
          'message-mine': msg.type === 'me',
          'message-system': msg.type === 'system'
        }"
      >
        <template v-if="msg.type === 'system'">
          <div class="system-message" :style="{ color: bgColor === 'white' ? 'rgba(39, 42, 55, 0.6)' : 'rgba(255, 255, 255, 0.6)' }">
            {{ msg.content }}
          </div>
        </template>
        <template v-else>
          <div class="message-content">
            <div class="message-sender" v-if="msg.type === 'other'" :style="{ color: bgColor === 'white' ? 'rgba(39, 42, 55, 0.6)' : 'rgba(255, 255, 255, 0.6)' }">
              {{ msg.sender.name }}
            </div>
            <div class="message-text" :style="msg.type === 'me' ? {} : { backgroundColor: bgColor === 'white' ? 'rgba(39, 42, 55, 0.1)' : 'rgba(255, 255, 255, 0.1)', color: bgColor === 'white' ? 'rgb(39, 42, 55)' : '#fff' }">
              {{ msg.content }}
            </div>
            <div class="message-time" :style="{ color: bgColor === 'white' ? 'rgba(39, 42, 55, 0.4)' : 'rgba(255, 255, 255, 0.4)' }">
              {{ msg.time }}
            </div>
          </div>
        </template>
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

.room-info {
  text-align: center;
}

.room-info h3 {
  margin: 0;
  font-size: 18px;
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

.message-system {
  justify-content: center;
}

.system-message {
  background: rgba(255, 255, 255, 0.05);
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 12px;
}

.message-content {
  max-width: 70%;
}

.message-sender {
  font-size: 12px;
  margin-bottom: 4px;
}

.message-text {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 15px;
  color: #fff;
  word-break: break-all;
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

/* 滚动条样式 */
.messages-container::-webkit-scrollbar {
  width: 5px;
}

.messages-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: rgb(29, 144, 245);
  border-radius: 5px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: rgb(24, 119, 204);
}
</style>