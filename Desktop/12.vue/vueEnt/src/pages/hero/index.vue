<template>
  <div>
    <div>
      <!-- <a href="#" class="btn btn-primary" @click.prevent="hAdd">添加英雄</a> -->
      <router-link to="/add" class="btn btn-primary" >添加英雄</router-link>
      <hr />
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>英雄名称</th>
            <th>英雄性别</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-if="heroes.length">
          <tr  v-for="item in heroes" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.heroName}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.cTime}}</td>
            <td>
              <!-- <button class="btn btn-success">编辑</button> -->
              <!-- <router-link to="/edit/item.id" class="btn btn-success" >编辑</router-link> -->
                  <button @click="$router.push('/edit/'+item.id)" class="btn btn-success">编辑</button>
              &nbsp;
              <button class="btn btn-danger" @click.prevent="hDel(item.id)" >删除</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr><td colspan="5">这里没有数据</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
//引入axios插件
import axios from 'axios'
export default {
  data(){
    return {
      heroes:[]
    }
  },
  // 进入页面就要获取数据,渲染页面,钩子函数
  created(){
    this.loadIndex();
  },
  // 封装获取数据,渲染数据的的功能
  methods: {

    hDel(id){
      confirm('你确定删除吗?')
      axios({
        method: 'DELETE',
        url: 'http://localhost:3000/heroes/'+id,
      }).then(res=>{
        this.loadIndex();
      }).catch(res=>{
        alert('删除失败')
      })
    },
    loadIndex(){
      // axios 发送ajax 请求 先安装
      axios({
        method: 'GET',
        url: 'http://localhost:3000/heroes',
      }).then(res=>{
        // console.log(res)
        this.heroes=res.data
      }).catch(res=>{
        this.heroes=[]
      })
    }
  }
}
</script>
