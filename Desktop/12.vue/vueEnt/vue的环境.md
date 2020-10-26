### 复习

1. .........................

### 搭建vue的webpack 环境

1. 搭建环境

   1. 安装包

      1. 开发依赖:   建房用到的挖掘机   -D

      2. 生产依赖:  房子卖出,抛弃挖掘机,需要线路等...   npm i vue

         ```
         vue会出现在node_module中
         ```

         

   2. 源main.js

      ```
      //引入vue  import App from 路径
      		  import Vue from 'vue'
      //渲染vue
      new Vue({
      	//vue的配置项,名render   值是函数
      	//功能: 把app这个组件挂载到vue实例
      	render: functin(h){
      		render h(app)
      	}
      }).$mount('#app')   // #app: 是index.html的div
      ```

   3. webpack.config.js

      ```
      const html..
      const vue...
      const path = require('path')
      module.exports={
      	entry:
      	output:
      	plugins:
      	module:
      	devserver:  //存在内存中,没有存到硬盘上
      	
      	//vue相关
      	new vue...()
      }
      ```

   4. index.html

      ```
      <div id='app'></div>
      ```

   5. app.vue

      ```
      <template>
      <div>
      这是一个vue组件
      
      </div>
      
      </tamplate>
      ```



### ES6模块化-与vue无关

1. 什么 是模块化,;一个js引入 另一个js

   1. 模块: 就是一个文件

   2. 模块化的规范:

      1. commonjs规范  nodejs的co...规范

         ```
         导出: module.export = {}
         导入 : const path = require('path')
         ```

         

      2. es6规范.

         1. 导出模块

            ```
            function fn(){
            ....
            }
            export {fn}
            
            //默认导出一个对象
            export default {
            	"f": f
            }
            import a from '地址'
            a.f();
            
            //默认导出一个值
            export default m
            import a from '地址'
            a就是这个值
            
            //按需导出
            export {fn1,fn2,fn3}
            import {fn1,fn2,fn3} from '地址'
            或者全部导入  import * as abc from '地址'
            ```

         2. 导入模块

            ```
            import {fn} from '导出模块的路径'
            ```

         3. 注意点: 需要借助webpack,html中不能直接引入

         4. 导入导出重命名: 解决命名重复

            ```
            //导出改名
            export {fn as fn2}
            //导入改名
            import {fn as fn1} from '地址'
            ```



### vue单文件组件规范(sfc)    .vue文件

1. 组成

   ```
   1.    
       <template>
       <div>
       <h1>{{mag}}</h1>
       </div>
   
       </template>
   2.    
       <script>组件除了模板之外的
       export default {
           data(){
           return {
               msg: ....
           }
           }
   
       }
       </script>
   3.需要安装一下它的loader  style-loader    
       <style>
           h1 {
               color: red
           }
   
   
       </style>
   ```

2. 根组件嵌套其他vue组件

   ```
   <script>
   import m from '地址'
   // 全局使用注册
   Vue.component('xxx',m)
   //局部使用注册
   
       export default {
           data(){
           return {
               msg: ....
           }
           }
           components: {
           	组件名: 组件对象
           }
   
       }
       </script>
   
   ```

3. 使用说明

   1. 定义一个组件,.vue文件

      1. 安装vetur插件
      2. 组件小驼峰命名

   2. 使用组件

      1. 当前组件引入其他组件

         ```
         import 组件名大驼峰命名 from '组件地址'
         ```

      2. 当前组件内注册

         ```
         <script>
         import m from '地址'
         // 全局使用注册
         Vue.component('xxx',m)
         //局部使用注册
         
             export default {
                 data(){
                 return {
                     msg: ....
                 }
                 }
                 components: {
                 	组件名: 组件对象
                 }
         
             }
             </script>
         
         ```

      3. 当前组件的视图中,使用

         ```
             <template>
             <div>
             <烤串></小驼峰>
             </div>
         
             </template>
         ```

         

### 项目(添加英雄)

1. 引入初始化文件夹

   1. 目标文件夹的index.html  link引入css

   2. .vue文件中   template 引入页面结构

      1. 精简代码

      2. 将头部弄到单独的组件,侧边栏弄到单独的组件

         ```
         1.导入组件
         import m from ''
         2.注册组件
         components: {
         	m
         
         }
         3.使用组件
         app.vue 原来位置  <m></m>
         ```

         

      3. 路由 main.js中

         ```
         import Add from '地址'
         //1.导入插件
         import VueRouter from 'vue-router'
         //2.使用插件
         Vue.use(VueRouter)
         //3.创建路由对象
         const router = new VueRouter({
         	routes: [
         		{
         			path: '',
         			//不能这样定义组件,模块化开发,写一个文件  在上面导入
         			component: Add,
         					{
         			path: '',
         			component: {
         				template: ``
         			}
         		}
         	]
         })
         4. 挂载到vue实例上
         new vue({
         router: router
         })
         ```

         

### 总结:

1. es6模块化
   1. 模块化是什么
      1. 一个文件就是一个模块
      2. 模块化就是允许一个js中引入另一个js
   2. 模块化有两种规范
      1. commonjs规范
      2. ES6模块化
         1. js原生的模块化    import  export
         2. 场景:
            1. 按需导出导入    export {f1,f2}   import {f1,f2} from '...'
            2. 默认导出导入    export default  {f1,f2}   import obj from '....'
            3. 1+2
            4. 导出导入重命名
               1. import {f1 as f2} from '...'
               2. export {f1 as f2}
2. vue单文件组件
   1. .vue后缀的文件就是一个组件
   2. 需要vue-loader webpack 支持
   3. 结构: 
      1. template  视图
      2. script   定义除模板之外的配置项
         1. 有一个export default {}
      3. style
   4. 使用方式
      1. 定义,直接写一个vue文件    vetur插件可以快速录入
      2. 引用,
         1.  当前组件导入要使用的组件 import	
         2. 注册组件
         3. 使用组件
3. webpack +vue-loader搭建开发环境



### 实现路由

1. 基本步骤

   1. 安装vue-router 插件

      ```
      npm i vue-router
      ```

   2. ```
      import Add from '地址'
      //1.导入插件
      import VueRouter from 'vue-router'
      import 新的vue页
      //2.使用插件
      Vue.use(VueRouter)
      //3.创建路由对象
      const router = new VueRouter({
      	routes: [
      		{
      			path: '',
      			//模块化开发,写一个文件  在上面导入
      			component: Add,
      					{
      			path: '',
      			//component: {
      				//template: ``
      			//}
      		}
      	]
      })
      4. 挂载到vue实例上
      new vue({
      router: router
      })
      ```

   3. 变换页面内容,创建相关vue页面

      1. 引入  注册   使用

   4. 侧边栏  router-link标签

      1. 当前激活的路由导航连接会多出一个特殊的类名,router-link-active,根据它来设置高亮效果 或者通过 active-link-class: 'active'来设置这个类



### json-server 启动服务 ,

1. 创建接口 src/duudu/db.json

### axios

1. 安装这个插件.不用引入js文件了
2. 引入插件  import axios from 'axios'
3. axios({})
4. 观察请求是否成功



### 功能

1. 获取数据

   1. ```
      <template>
      <div>
      //key的作用,用它来区别每一个tr.不用会报错
      <tr v-for=..  :key=""></tr>
      
      </div>
      
      
      </template>
      
      
      
      
      export default {
      	data(){
      		return {
      			hero: []
      		}
      	}
      	created(){
      	 调用请求渲染函数
      	},
      	methods: {
      		函数(){
      		axios({}).then(this.=this.).catch(this.=[])
      	}
      	
      }
      
      
      index.vue中  v-if 提示内容,数据全部删除后
      ```

      1. methods 中写一个获取数据,渲染数据 函数
      2. 钩子函数 created  调用函数,创建实例就会执行
      3. 扩展功能  key

   2. 删除功能

      1. 绑定点击事件  methods 定义删除函数

         ```
         hdel(id){
         	提示信息
         	发请求 成功
         	调用渲染数据函数
         	失败: 就提示
         }
         ```

   3. 添加功能

      1. 路由跳转到添加页

         ```
         index.vue
         
         <a @click.prevent=$router.push('.add')></a>
         ```

      2. 提交功能

         ```
         input v-model='gender'
         button @click.prevent="hAdd"  
         methods: {
         
         	hAddd(){
             	1.校验用户的输入
             	2.发请求
             	3.添加成功,跳转到主页
             	  添加失败,给提示
         	}
         }
         ```

   4. 编辑功能

      1. 引入  注册  使用

      2. 注册点击 ,跳转页面 

         ```
         动态路由:
         注册组件:  path: /:id
         button @click.prevent=$router.push('/+id')
         通过vue 查找params 找到id
         ```

      3. 使用在 edit.vue

         ```
         import axios from 'axios'
         export default {
         data () {
          return {
          	heroname:'',
          	.....
          }
         }
         created () {
         this.渲染数据函数();
         },
         methods: {
         	渲染数据函数(){
         	发送请求,拿到这个id的数据
         	成功: this....=res.data..
         	通过v-model 进行数据回填
         }
         }
         ```

      4. 保存提交

         ```
         button @click.prevent=''
         methodes: {
         	hSave(){
         		发送修改请求
         		url +this.$route.params.hero_id
         		data: {}
         		请求成功,跳转首页
         		this..=this.$router.push...
         	}
         }
         ```



### 总结

1. vue环境

   1. 环境搭建

      1. 初始化
      2. 安装包
         1. 开发依赖
         2. 生产依赖
      3. 配置文件
      4. 入口文件main.js导入模块
      5. 开发调试,用webpack-server

   2. 路由设置

      1. 下载路由插件

      2. 配置路由规则

         1. 引入插件

            ```
            import....
            ```

            

         2. new Vuerouter({routes:{}})

            ```
            {path: '' ,component: ...}
            ```

         3. 把路由对象挂载到vue实例上

            ```
            new Vue {router}
            ```

         4. 组件上设置路由出口

         5. 注意: 

            1. 动态路由跳转/传参
            2. 当前选中的路由对应的 router-link 会多出一个类router-link-active

   3. ajax

      1. 安装 axios
      2. 引入axios  import axios from 'axios'
      3. 功能
         1. 增加  POST
         2. 删除  DELETE
         3. 编辑  PUT
         4. 查询  GET

   4. v-for    : key

      1. v-model  trim
      2. @click  prevent
      3. 结构赋值
      4. v-if  else

