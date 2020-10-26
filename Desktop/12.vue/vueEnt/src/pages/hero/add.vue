<template>
    <div>

      <form>
        <legend>添加英雄</legend>
        <div class="form-group">
          <label>英雄名称</label>
          <input type="text" class="form-control" v-model.trim="heroName" />
        </div>
        <div class="form-group">
          <label>英雄性别</label>
          <div>
            <input type="radio" value="男" v-model="gender"> 男
            <input type="radio" value="女" v-model="gender"> 女
          </div>
        </div>
        <button class="btn btn-primary" @click="hAdd()">提交</button>
      </form>


    </div>

</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            heroName: '',
            gender: '女'
        }
    },
    methods: {

    hAdd(){
         const {heroName,gender} = this
        if(heroName===''){
            return
        }
       
      axios({
        method: 'POST',
        url: 'http://localhost:3000/heroes/',
        data: {
            cTime: Date.now(),
            heroName,
            gender
        }
      }).then(res=>{
        //   成功跳转到首页
        this.$router.push('/index')
      }).catch(res=>{
          alert('添加失败了')
      })
    },
    }
}
</script>