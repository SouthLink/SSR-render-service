import CommonBanner from "./index.vue";

CommonBanner.install = function (Vue) {
  Vue.component(CommonBanner.name, CommonBanner);
};

export default CommonBanner;
