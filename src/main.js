import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import $ from 'jquery';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/css/common.css';
import 'swiper/dist/css/swiper.css';
import './assets/Iconfont/css/iconfont.css'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
