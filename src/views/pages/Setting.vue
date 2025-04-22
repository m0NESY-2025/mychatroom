<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import defaultImg from '@/assets/img/Me.jpg'

const userName = ref('')
const avatarUrl = ref(defaultImg)
const Theme =ref('black')
const emit=defineEmits(['updateTheme'])
const titleColor = ref('white')
const props=defineProps({
    bgColor:String
})
const bgColor=props.bgColor

const saveSettings = () => {
  ElMessage.success('设置保存成功！')
  // 这里添加实际保存逻辑
  emit('updateTheme',Theme.value)
  //修改标题颜色
  titleColor.value=Theme.value==='black' ? 'white' : 'rgb(39, 42, 55)'
}
onMounted(()=>{
    if(bgColor===titleColor.value){
        titleColor.value='black'
        Theme.value='white'
    }else{
        titleColor.value='white'
        Theme.value='black'
    }
    
})
</script>

<template>
  <div class="setting-container">
    <h1 class="setting-title" :style="{color:titleColor}">信息修改</h1>
    
    <div class="setting-content">
      <el-form>

        <!-- 主题切换 -->
        <el-form-item label="主题切换">
          <el-switch
            v-model="Theme"
            inactive-text="黑色"
            inactive-value="black"
            active-text="白色"
            active-value="white"
          />
        </el-form-item>

        <!-- 头像修改 -->
        <el-form-item >
          <el-upload><!-- 头像上传 -->
            <el-avatar :src="avatarUrl" :size="120" class="avatar" />
          </el-upload>
        </el-form-item>

        <!-- 姓名修改 -->
        <el-form-item >                                     <!-- clearable叉叉按钮-->
          <el-input v-model="userName" placeholder="请输入姓名"  class="name-input" clearable/>
        </el-form-item>

        <!-- 保存按钮 -->
        <el-form-item>
          <el-button type="primary" @click="saveSettings" class="save-btn">
            保存设置
          </el-button>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.setting-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  color: white;
}

.setting-title {
  font-size: 50px;
  margin-bottom: 50px;
}

.setting-content {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  padding:30px;
  box-shadow: 0 5px 20px rgba(19, 16, 16, 0.15);
  margin : 0 auto;
}

.avatar {
  cursor: pointer;
  transition: 0.25s;
}

.avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(28, 136, 245, 0.742);
}

.name-input {
 width: 300px;
}

.save-btn {
  width: 20%;
  margin-top: 30px;
}

</style>