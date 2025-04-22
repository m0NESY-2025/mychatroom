<script setup>
import { onMounted, ref } from 'vue'
import HeadPortrait from './HeadPortrait.vue'  
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import '@/assets/font/iconfont.css' 
import HeadImg from '@/assets/img/Me.jpg'
const router = useRouter()
const current = ref(0)
const menuList = ref(["icon-xinxi", "icon-shezhi"])
const imgUrl=ref(HeadImg)
const changeMenu = (index) => {
  switch (index) {
    case 0:
      router.push('/chat')
      break
    case 1: 
      router.push('/setting')
      break
  }
  current.value = index
}
</script>

<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="{ activeNav: index === current }"
          @click="changeMenu(index)"
        >
          <div class="block"></div>
          <span class="iconfont" :class="item"></span>
        </li>
      </ul>
    </div>
    <div class="own-pic">
        <HeadPortrait :imgUrl="imgUrl"></HeadPortrait>
    </div>
  </div>
</template>

<style scoped>
.nav {
  width: 90%;
  height: 90vh;
  position: relative;
  border-radius: 20px 0 0 20px;
}

.nav-menu-wrapper {
  position: absolute;
  top: 40%;
  transform: translate(0, -50%);
}

.menu-list li {
  margin: 100px 0 0 10px;
  list-style: none;
  cursor: pointer;
  position: relative;
}

.menu-list li .block {
  background-color: rgb(29, 144, 245);
  position: absolute;
  left: -50px;
  width: 5px;
  height: 20px;
  transition: 0.5s;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  opacity: 0;
}
.own-pic {
    position: absolute;
    bottom: 10%;
    margin-left: 25px;
  }
.menu-list li:hover span {
  color: rgb(29, 144, 245);
}

.menu-list li:hover .block {
  opacity: 0.5;
}

.activeNav span {
  color: rgb(29, 144, 245);
}

.activeNav .block {
  opacity: 1 !important;
}
.own-pic {
    position: absolute;
    bottom: 5%;
    margin-left: 25px;
  }
</style>