// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//组件的导入
import Vue from 'vue'
//导入根组件
import App from './App'
//导入路由
import router from './router'
//导入自定义插件
import Http from './plugin/http'
//使用ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入全局css样式
import '@/assets/css/index.css';
// import qs from 'qs'
//引入字体图标样式
import 'font-awesome/css/font-awesome.css'
//导入home包含的组件
// import layer01 from '@/components/cusBread.vue'
// 组件名， 组件选项所在对象
// 组件的名字应该由组件本身提供
// Vue.component(MyBread.name, MyBread);



//使用ui组件
Vue.use(ElementUI);
//在开发时输出一些vue代码提示
 Vue.config.productionTip = false
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.baseURL = "http://localhost:8000/"
// Vue.prototype.$http = axios;
// Vue.prototype.$qs = qs;
//使用自定义插件
Vue.use(Http);


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
