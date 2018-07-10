import Vue from 'vue'
// import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Layout from './components/layout.vue'
import mock from './mock/mock'
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Validator.localize('zh_CN',zh_CN);
Vue.use(VeeValidate);
Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mock,
  render: h => h(Layout),
  // components:{Layout},
  // template:'<Layout/>'无法使用template 只能用render代替
})
