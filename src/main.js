// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//组件的导入
import Vue from 'vue'
//导入根组件
import App from './App'
//导入路由
import router from './router'
//使用ui组件
import ElementUI from 'element-ui'




//使用ui组件
Vue.use(ElementUI);
//在开发时输出一些vue代码提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
