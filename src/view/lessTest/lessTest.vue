<template>
  <div>
    <div class="one">
      <div class="one1"></div>
    </div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="five"></div>
    <div class="six"></div>
  </div>
</template>

<script>
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

  },
  mounted(){

  }
}
</script>

<style lang="less"  scoped>
  @hanleColor:(#ede);
  .one{
    border: 1px solid rebeccapurple;
    .one1{
      height: 100px;
      width: 100px;
      background: green;
    }
  }
  .two{
    height: 200px;
    width: 200px;
    background-color: aqua;
    .one();
    &:hover{
      background-color: red;
    }
  }
  .three{
   height: 300px;
   width: 500px;
   background-color:goldenrod ; 
   @media (max-width:200px) {
      height: 800px;
   }
  }
  @media (min-width:500px) {
    .three {
      height: 200px;
      background-color: @hanleColor;
    }
  }
  .five{
    .one>.one1;
  }
  .six{
    height: .five[height];
    width: .five[width];
    background-color:.five[background] ;
  }
</style>
