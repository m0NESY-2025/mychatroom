<script setup>
import { ref } from 'vue'
import Nav from '../components/Nav.vue'
import defaultImg from '@/assets/img/Me.jpg'

const Theme = ref('black') // 初始化默认值
const avatarUrl = ref(defaultImg) // 添加头像状态

const updateTheme = (NewValue) => {
  Theme.value = NewValue
  if(Theme.value==='black'){
    document.querySelector('.home').style.backgroundColor = 'rgb(39, 42, 55)';
  }
  else{
  document.querySelector('.home').style.backgroundColor='#f7f7f7'
  }
}

// 处理头像更新
const updateAvatar = (newAvatarUrl) => {
  avatarUrl.value = newAvatarUrl
}
</script>

<template>
  <div class="home" >
    <el-container>
      <el-aside width="100px">
        <Nav :avatarUrl="avatarUrl"/>
      </el-aside>
      <el-main>
        <router-view  
          @updateTheme="updateTheme" 
          @updateAvatar="updateAvatar"
          :bgColor="Theme"
        />
      </el-main>
    </el-container>
  </div>
</template>

<style>
.home {
  width: 90vw;
  height: 90vh;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color:rgb(39, 42, 55);
  transform: translate(-50%, -50%);
  transition: background-color 0.3s; /* 添加过渡效果 */
}
body {
  user-select: none;
}
</style>