// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from './http'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI);
//可以在各个组件中使用$axios
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
