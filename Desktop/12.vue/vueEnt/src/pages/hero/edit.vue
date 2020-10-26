<template>
  <div>
    <form>
      <legend>编辑英雄{{$route.params.id}}</legend>
      <div class="form-group">
        <label>英雄名称</label>
        <input type="text" class="form-control" v-model="heroName" />
      </div>
      <div class="form-group">
        <label>英雄性别</label>
        <div>
          <input type="radio" value="男" v-model="gender" /> 男
          <input type="radio" value="女" v-model="gender" /> 女
        </div>
      </div>
      <button class="btn btn-primary" @click.prevent="hSave">提交</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return {
            heroName:'',
            gender:''
        }
    },
  created() {
    this.loadIndexById();
  },
  methods: {
      hSave(){
          const {heroName,gender} =this
          if(heroName===''||gender===''){
              return
          }
          axios({
              method: 'PUT',
              url: 'http://localhost:3000/heroes/'+this.$route.params.id,
              data: {
                  heroName,
                  gender,
                  cTime: Date.now(),
                  id: this.$route.params.id

              }
          }).then(res=>{
              this.$router.push('/index');
          }).catch(res=>{
              alert('提交失败')
          })
      },
    loadIndexById() {
      // axios 发送ajax 请求 先安装
      axios({
        method: "GET",
        url: "http://localhost:3000/heroes/"+this.$route.params.id,
      })
        .then((res) => {
          // console.log(res)
          this.heroName=res.data.heroName;
          this.gender = res.data.gender;
        })
        .catch((res) => {
          alert('页面丢失')
        });
    },
  },
};
</script>