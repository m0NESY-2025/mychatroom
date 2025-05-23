# Vue3 在线多人聊天室

一个基于 Vue3 和 WebSocket 的实时多人聊天应用，支持实时消息、在线用户列表、主题切换等功能。

## 功能特点

- 🚀 实时消息发送和接收
- 👥 在线用户列表实时更新
- 🌓 深色/浅色主题切换
- 🎭 用户头像自定义
- 💬 系统消息提醒（用户加入/离开）

## 技术栈

- 前端
  - Vue 3
  - Element Plus
  - Socket.io-client
  - Vite

- 后端
  - Node.js
  - Express
  - Socket.io

## 快速开始

### 前端启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 后端启动

```bash
# 进入后端目录
cd server

# 安装依赖
npm install

# 启动服务器
node index.js
```

## 使用说明

1. 启动后端服务器（默认端口：3000）
2. 启动前端开发服务器（默认端口：5173）
3. 打开浏览器访问 `http://localhost:5173`
4. 可以使用不同的浏览器或无痕窗口模拟多个用户

## 功能演示

### 聊天功能
- 实时消息发送和接收
- 支持多人同时在线聊天
- 系统消息提醒（用户加入/离开）

### 用户功能
- 随机用户名生成
- 自定义头像上传
- 在线用户列表显示

### 主题切换
- 支持深色/浅色主题
- 实时切换无刷新

## 开发环境

- Node.js >= 14.0.0
- Vue 3
- 现代浏览器（支持 WebSocket）

## 注意事项

1. 确保后端服务器正常运行
2. 确保端口 3000 和 5173 未被占用
3. 建议使用 Chrome 或 Edge 最新版本
4. 本项目仅用于学习和演示目的

## 未来计划

- [ ] 添加表情包发送功能
- [ ] 添加图片/文件发送功能
- [ ] 支持修改用户昵称

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。
