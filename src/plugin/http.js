//引入axios
import axios from 'axios'
import { Message } from 'element-ui';
import qs from 'qs'
//自定义插件，第一个参数必须是vue，第二个是函数，可以不写
//自定义一个自己的Http插件
//在vue中添加一个axios插件,此插件是一个对象
const Http = {};
Http.install = function (Vue) {

  //配置一个基本的url
  axios.defaults.baseURL = 'http://localhost:8000/';
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    //console.log(config);
    // 在发送请求之前为请求设置请求头
    if (config.method === "post") {

      config.data = qs.stringify(config.data)
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 4. 添加实例方法
  Vue.prototype.$http = axios;
};
//导出插件
export default Http;