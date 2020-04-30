import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './element.js'
import '../src/assets/css/reset.css'//去除浏览器默认样式
import '../src/assets/css/public.css'
import http from './net.js'
import md5 from 'js-md5'
import VueCookies from 'vue-cookies'
import '../src/assets/icon/iconfont.css'
Vue.prototype.$cookies = VueCookies
Vue.use(VueCookies)
Vue.prototype.$http = http
Vue.prototype.$md5 = md5
// set default config
Vue.$cookies.config('7d')
// set global cookie
Vue.$cookies.set('theme','default');
Vue.$cookies.set('hover-time','1s');
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
