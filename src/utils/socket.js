import { io } from 'socket.io-client';

// 创建 Socket 实例
const socket = io('http://localhost:3000');

// 导出 Socket 实例和常用方法
export default {
    // Socket 实例
    socket,

    // 连接到服务器
    connect() {
        socket.connect();
    },

    // 断开连接
    disconnect() {
        socket.disconnect();
    },

    // 加入聊天室
    joinRoom(userData) {
        socket.emit('user-join', userData);
    },

    // 发送消息
    sendMessage(message) {
        socket.emit('chat-message', message);
    },

    // 更新用户头像
    updateAvatar(newAvatarUrl) {
        socket.emit('avatar-update', newAvatarUrl);
    },

    // 监听聊天消息
    onChatMessage(callback) {
        socket.on('chat-message', callback);
    },

    // 监听系统消息
    onSystemMessage(callback) {
        socket.on('system-message', callback);
    },

    // 监听在线用户列表更新
    onOnlineUsers(callback) {
        socket.on('online-users', callback);
    },

    // 监听头像更新
    onAvatarUpdate(callback) {
        socket.on('avatar-update', callback);
    },

    // 移除所有监听器
    removeAllListeners() {
        socket.removeAllListeners();
    }
}; 