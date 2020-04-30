import axios from 'axios';
import { Loading } from 'element-ui';
import VueCookies from 'vue-cookies'
// 创建实例时设置配置的默认值
axios.defaults.baseURL = 'http://47.115.74.95:3001'
let loadingInstance = {}
// 添加请求拦截器
axios.interceptors.request.use(request => {
  loadingInstance = Loading.service({ fullscreen: true });
  request.headers.common['Authorization'] = "Bearer " + VueCookies.get('token')
  request.credentials = true;
  return request;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  setTimeout(() => {
    loadingInstance.close();
  }, 300);
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
// let getCookie = function (cname) {
//   var name = cname + "=";
//   var ca = document.cookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == " ") c = c.substring(1);
//     if (c.indexOf(name) != -1) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
export default axios;