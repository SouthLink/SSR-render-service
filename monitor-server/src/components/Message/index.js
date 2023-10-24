import CommonMessage from "./index.vue";

CommonMessage.install = function (Vue) {
  Vue.component(CommonMessage.name, CommonMessage);
};

export default CommonMessage;
