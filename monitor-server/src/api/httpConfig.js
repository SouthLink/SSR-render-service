/*
 * @Author: Tang Biao
 * @Date: 2019-03-11
 * @Last Modified by:
 * @Last Modified time:
 */

import Vue from "vue";
import axios from "axios";
import iView from "iview";
import router from "@/router/index";
import Cookies from "js-cookie";

let timeId = null;

//  请求时的拦截
axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
); //  返回接口返回的错误信息

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data) {
      const { code, message } = response.data;
      if (code === 401) {
        // if (/rppApply/.test(location.href)) {
        //   return;
        // }
        clearTimeout(timeId);
        Cookies.remove("userInfo");
        timeId = setTimeout(() => {
          router.push({
            path: "/login",
          });
          Vue.prototype.$Message.error(message);
        }, 200);
        return;
      } else if (code !== 200) {
        Vue.prototype.$Message.error(message);
        return Promise.reject(response);
      }
      return response;
    }
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      iView.LoadingBar.error();
      Vue.prototype.$Message.error("服务器超时，请稍后再试");
    }
    // 请求错误时做些事
    if (error.response) {
      const {
        status,
        data: { message, msg },
      } = error.response;
      switch (status) {
        case 500:
          Vue.prototype.$Message.error(message || msg || "未知异常！");
          break;
        case 504:
          Vue.prototype.$Message.error("服务器超时，请稍后再试");
          break;
        case 502:
          Vue.prototype.$Message.error("Bad Gateway，请稍后再试");
          break;
        case 401:
          if (/rppApply/.test(location.href)) {
            return;
          }
          clearTimeout(timeId);
          Cookies.remove("userInfo");
          timeId = setTimeout(() => {
            router.push({
              path: "/login",
            });
            Vue.prototype.$Message.error(message);
          }, 200);
          break;
        // 多点登陆错误
        case 405:
          clearTimeout(timeId);
          timeId = setTimeout(() => {
            Vue.prototype.$Message.error(message);
            router.push({
              path: "/login",
            });
          }, 200);
          break;
        default:
          Vue.prototype.$Message.error("服务器故障，请稍后再试");
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
