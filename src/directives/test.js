
export default (Vue) => {
  Vue.directive('test', {
    bind(el, bind){
      el.style.color = 'red'
      console.log(bind)
    }
  })
}