<template>
  <div  class="container">
    <!-- 头部组件 -->
    <my-header></my-header>

    <div class="col-md-2">
      <!-- 侧边栏 -->
      <side-bar></side-bar>
    </div>
    <div class="col-md-10">
      <!-- 路由出口 -->
      <router-view></router-view>
      
  </div>
  </div>
  
</template>

<script>
// 引入header.vue 文件
import MyHeader from './components/header.vue'
import SideBar from './components/sideBar.vue'
  export default {

    // data() {
    //   return {
        
    //   }
    // },
    //注册header.vue文件
    components:{
      MyHeader,
      SideBar
    }
  }
</script>