// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = `http://localhost:8888/api/private/v1/`
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  // 在请求拦截器中定制请求头，加入 Authorization token 数据
  config.headers['Authorization'] = window.localStorage.getItem('token')
  // return config 类似于 next
  // return config 就是放行的标志
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
