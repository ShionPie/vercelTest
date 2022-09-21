<template>
  <div>
    <kinesis-container>
        Here, you can put
        <kinesis-element :strength="10">
          whatever
        </kinesis-element>
        <kinesis-element :strength="20">
          content!
        </kinesis-element>
    </kinesis-container>
    <div class="cont">
    </div>
    <template v-for="(item,index) in list">
      <input :key="index" v-model="item.x" type="text" />
      <button @click="getVal(list[index])">{{index}}</button>
      {{list[index].x}}
      <br/>
    </template>
    <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
        </div>
    </Upload>
    <div v-test="'wewe'">这是自定义文字</div>
    <div>
      <el-input v-model="theVal"></el-input>
    </div>
    <div>{{$t('login.test')}}</div>
    <el-button @click="changeLang">切换</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      theVal: '',
      list: [
        {index: 1},
        {index: 2},
        {index: 3},
        {index: 4},
        {index: 5}
      ]
    }
  },
  computed:{

  },
  watch:{

  },
  methods:{
    changeLang() {
      let lang = localStorage.getItem('setLang')
      if (lang === '' || lang === 'zh') {
        this.$i18n.locale = "en";
        localStorage.setItem('setLang', 'en')
      } else if (lang === 'en') {
        this.$i18n.locale = "zh";
        localStorage.setItem('setLang', 'zh')
      }
    },
    getVal(val){
      console.log(val.x)
    }
  },
  mounted(){
    let jsonData = require('./tsconfig.json')
    console.log('jsonData', jsonData)
  }
}
</script>

<style  scoped>
 .cont{
  height: 500px;
  width: 100px;
  background-image: url('../../assets/单车.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: auto;
  resize: both;

 }
</style>
