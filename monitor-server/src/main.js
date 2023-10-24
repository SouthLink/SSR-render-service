import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Message, Modal } from "iview";
import "./plugins/iview.js";
import store from "./store";

Vue.config.productionTip = false;
// 全局注册iview Message 组件
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
