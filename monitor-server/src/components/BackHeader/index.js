import CommonHeader from "./index.vue";

CommonHeader.install = function (Vue) {
  Vue.component(CommonHeader.name, CommonHeader);
};

export default CommonHeader;
