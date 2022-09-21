<template>
    <div>
        {{data}}
    </div>
</template>

<script>
    import { retry } from 'async'
import axios from 'axios'
  export default {
    name: "index.vue",
    data(){
      return {
        data:''
      }
    },
    mounted() {

      let request = axios.create({
      
      })
      let param = {
        name:'123'
      }
      let qingqiu = (data)=>{
        return request({
          url:'http://127.0.0.1:8999/add',
          method:'post',
          data
        })
      }
      qingqiu(param).then(res => {
        console.log('====',res)
      })
    }
  }
</script>

<style scoped>

</style>
