import Vue from 'vue'
import App from '../src/view/dongHua/index.vue'
import VueClipboard from 'vue-clipboard2'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'bootstrap/dist/js/bootstrap.min'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import test from '@/directives/test'
test(Vue)
import i18n from './lang/index'

Vue.use(iView);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueClipboard)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false
import { router } from './router/index'
import VueKinesis from 'vue-kinesis'
Vue.use(VueKinesis)



new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
