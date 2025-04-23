// 导入必要的模块
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// 创建 Express 应用
const app = express();
app.use(cors());  // 启用 CORS，允许前端访问

// 创建 HTTP 服务器
const server = createServer(app);

// 创建 WebSocket 服务器
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // 允许前端开发服务器访问
        methods: ["GET", "POST"]
    }
});

// 存储在线用户信息
const onlineUsers = new Map();

// 监听客户端连接
io.on('connection', (socket) => {
    console.log('用户连接成功');

    // 处理用户加入
    socket.on('user-join', (userData) => {
        // 保存用户信息
        onlineUsers.set(socket.id, userData);
        
        // 广播用户加入消息
        io.emit('system-message', {
            type: 'system',
            content: `${userData.name} 加入了聊天室`,
            timestamp: Date.now()
        });

        // 发送在线用户列表
        io.emit('online-users', Array.from(onlineUsers.values()));
    });

    // 处理聊天消息
    socket.on('chat-message', (message) => {
        const userData = onlineUsers.get(socket.id);
        if (userData) {
            // 广播消息给所有用户
            io.emit('chat-message', {
                type: 'message',
                content: message,
                sender: userData,
                timestamp: Date.now()
            });
        }
    });

    // 处理头像更新
    socket.on('avatar-update', (newAvatarUrl) => {
        const userData = onlineUsers.get(socket.id);
        if (userData) {
            // 更新用户头像
            userData.avatar = newAvatarUrl;
            onlineUsers.set(socket.id, userData);

            // 广播头像更新消息
            io.emit('avatar-update', {
                userId: userData.id,
                newAvatarUrl: newAvatarUrl
            });

            // 更新在线用户列表
            io.emit('online-users', Array.from(onlineUsers.values()));
        }
    });

    // 处理用户断开连接
    socket.on('disconnect', () => {
        const userData = onlineUsers.get(socket.id);
        if (userData) {
            // 广播用户离开消息
            io.emit('system-message', {
                type: 'system',
                content: `${userData.name} 离开了聊天室`,
                timestamp: Date.now()
            });

            // 从在线用户列表中移除
            onlineUsers.delete(socket.id);
            io.emit('online-users', Array.from(onlineUsers.values()));
        }
    });
});

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 