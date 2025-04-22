<script setup>
import { ref } from 'vue'
import Nav from '../components/Nav.vue'
import Setting from '../views/pages/Setting.vue'
import Chat from '../views/pages/Chat.vue'
const Theme = ref('black') // 初始化默认值
const updateTheme = (NewValue) => {
  Theme.value = NewValue
  if(Theme.value==='black'){
    document.querySelector('.home').style.backgroundColor = 'rgb(39, 42, 55)';
  }
  else{
  document.querySelector('.home').style.backgroundColor='#f7f7f7'
  }
}
</script>

<template>
  <div class="home" >
    <el-container>
      <el-aside width="100px">
        <Nav/>
      </el-aside>
      <el-main>
        <router-view  @updateTheme="updateTheme" :bgColor="Theme"/>
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