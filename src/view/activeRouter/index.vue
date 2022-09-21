<template>
    <div class="bj">
        <div class="left">
            <el-menu style="height: 100%" >
                <zl-submenu :permissionList="permissionList"></zl-submenu>
<!--                <template v-for="item in permissionList">-->
<!--                    <el-submenu v-if="item.children.length!==0" :index="item.meta.title">-->
<!--                        <template slot="title">{{item.meta.title}}</template>-->
<!--                        <el-menu-item v-for="kid in item.children" :key="kid.meta.title" :index="kid.meta.title">{{kid.meta.title}}</el-menu-item>-->
<!--                    </el-submenu>-->
<!--                    <el-menu-item v-else :index="item.meta.title">{{item.meta.title}}</el-menu-item>-->
<!--                </template>-->
            </el-menu>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
  import { routes,router } from '../../router/index'
  import ZlSubmenu from "@/view/activeRouter/component/subMenu";


  export default {
    name: "index",
    components:{
      ZlSubmenu
    },
    data(){
      return {
        permissionList: [],
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    mounted() {
      this.permissionList = [
        {
          path:'/test1',
          meta:{
            title:'test1'
          },
          components:'test1',
          children:[
            {
              path:'/sub1',
              meta:{
                title:'sub1'
              },
              children:[
                {
                  path: '/aa',
                  meta: {
                    title:'aa2'
                  },
                  children:[
                    {path:'/cc',
                      meta:{
                        title:'cc2'
                      },
                      children:[],
                      components: 'sub2'
                    },
                    {path:'/dd',
                      meta:{
                        title:'dd2'
                      },
                      children:[],
                      components: 'sub2'
                    }
                  ],
                  components: 'teste2'
                },
                {
                  path:'/bb',
                  meta:{
                    title:'bb2'
                  },
                  children:[],
                  components: 'sub2'
                }
              ],
              components: 'sub1'
            },
            {
              path:'/sub2',
              meta:{
                title:'sub2'
              },
              children:[],
              components: 'sub2'
            }
          ]
        },
        {
          path: '/test2',
          meta: {
            title:'teste2'
          },
          children:[],
          components: 'teste2'
        }
      ]
      this.addSource(this.permissionList)
      console.log(this.permissionList)
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      // 给每个路由加上资源
      addSource(data) {
        data.forEach((el)=>{
          el.components = routes[el.components]
          if (el.children.length !== 0) {
            this.addSource(el.children)
          }
        })
      }
    }
  }
</script>

<style scoped>
.bj{
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
}
.left{
    height: 100%;
    width: 20%;
    background-color: #42b983;
    float: left;
}
.right{
    height: 100%;
    width: 80%;
    background-color: greenyellow;
    float: left;
}
</style>
