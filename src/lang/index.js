import Vue from 'vue'
// 使用插件
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

const i18n = {
    locale: localStorage.getItem('setLang') || 'zh', // 语言标识,第一次登录默认是中文
    messages: {
        zh: require('./ch'), // 中文
        en: require('./en'), // 英语
        
      }
}

export default i18n
