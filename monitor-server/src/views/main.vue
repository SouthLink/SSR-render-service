<template>
  <div class="wrapper">
    <common-header />
    <common-banner v-show="isBannerShow" />
    <router-view />
    <Home v-show="isBannerShow" />
    <common-footer />
    <div class="wrapper-container"></div>
  </div>
</template>

<script>
// import Cookies from 'js-cookie';
// import axios from 'axios';
import CommonHeader from "@/components/Header/index";
import CommonBanner from "@/components/Banner";
import CommonFooter from "@/components/Footer";
import Home from "./homeView";

export default {
  name: "Main",
  components: {
    CommonHeader,
    CommonBanner,
    CommonFooter,
    Home,
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    isBannerShow() {
      const { path } = this.$route;
      return path === "/" || path === "/home" ? true : false;
    },
    // breadcrumbList() {
    //   const path = this.currentPath;
    //   const pathArr = path.split('/').filter(e => e !== '');
    //   const urls = [];
    //   for (let i = 0, len = pathArr.length; i < len; i += 1) {
    //     urls.push(`/${pathArr.slice(0, (i + 1)).join('/')}`);
    //   }

    //   if (path && pathArr.length) {
    //     let nodeList = this.menus;
    //     const breadcrumb = [];
    //     for (const url of urls) {
    //       // 路由的path中，一级路由含有/
    //       const currentNode = nodeList && nodeList.find(e => url === e.uri);
    //       if (currentNode) {
    //         const { uri, children } = currentNode;
    //         let redirect = uri;
    //         if (children && children.length) {
    //           nodeList = currentNode.children; // 下一级路由节点
    //           let [next] = children;
    //           while (next.children && next.children.length) {
    //             [next] = next.children;
    //           }
    //           redirect = next.uri;
    //         }
    //         breadcrumb.push({ redirect, ...currentNode });
    //       } else {
    //         break;
    //       }
    //     }

    //     return breadcrumb;
    //   }
    //   return [];
    // },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
