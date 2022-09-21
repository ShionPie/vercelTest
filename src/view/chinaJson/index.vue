<template>
  <div>
    <button @click="toExport">点击</button>
  </div>
</template>

<script>
import exportList from './export'
import data from './china.json'
 import xlsx from 'xlsx'
export default {
 
  data(){
    return{

    }
  },
  computed:{

  },
  watch:{

  },
  methods:{
    toExport(){
      this.list[0].forEach(el => {
        el.parentId = ''
        // el.cidx
        for(let i = el.cidx[0];i <= el.cidx[1];i++) {
          this.list[1][i].parentId = el.id
        }
      })
      this.list[2].forEach(el=>{
        el.parentId = ''
      })
      // this.list[1].forEach(el => {
      //   // el.cidx
      //   for(let i = el.cidx[0];i <= el.cidx[1];i++) {
      //     this.list[2][i].parentId = el.id
      //   }
      // })
      
      let list = [...this.list[0],...this.list[1],...this.list[2]]
      list.forEach(el=>{
        if(el.pinyin) {
          el.pinyinsum = el.pinyin.toString()
        } else {
          el.pinyinsum = ''
        }
        if(el.location){
          el.jingdu = el.location.lng
        } else {
          el.jingdu = ''
        }
        if(el.location){
          el.weidu = el.location.lat
        } else {
          el.weidu = ''
        }
      })
      console.log(list)
      
      let head = ['id','简称','全称','拼音','经度','纬度','父id']
      let body = ['id','name','fullname','pinyinsum','jingdu','weidu','parentId']
      exportList(list,head,body)
    }
  },
  mounted(){
    this.list = data.result
    console.log(this.list)
  }
}
</script>

<style  scoped>

</style>
