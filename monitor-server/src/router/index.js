import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    component: HomeView,
    name: "error",
    url: "/",
    label: "首页",
    children: [
      {
        path: "/errorList",
        name: "errorList",
        label: "页面错误列表",
        url: "/errorList",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/ErrorList.vue"),
      },
      {
        path: "/performaceList",
        name: "performaceList",
        label: "性能指标列表",
        url: "/performaceList",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/PerformaceList.vue"),
      },
      {
        path: "/fetchInterceptList",
        name: "fetchInterceptList",
        label: "接口错误列表",
        url: "/fetchInterceptList",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/FetchInterceptList.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
