<template>
  <div class="wrapper">
    <common-header :userName="userName" @signOut="signOut()"></common-header>
    <div class="wrapper-container">
      <div class="wrap-row">
        <Layout>
          <!-- 侧边栏 -->
          <Sider
            hide-trigger
            :class="{ navAnimation: isNavShow, navHide: !isNavShow }"
            :style="{
              background: '#fff',
              width: '240px !important',
              minWidth: '240px',
              maxWidth: '240px',
              flex: '0 0 240px',
            }"
          >
            <div class="query">
              <Input
                v-model="vcMenuName"
                @on-enter="query"
                clearable
                @on-clear="onClear"
                placeholder="请输入二级菜单名称"
                style="width: 180px; height: 28px"
              >
                <!-- <Icon type="ios-search" slot="suffix"  /> -->
              </Input>
              <Button type="primary" class="sbtn" size="small" @click="query"
                >搜索</Button
              >
            </div>
            <Button
              class="btnColor"
              @click="isNavShow = !isNavShow"
              :icon="isNavShow ? 'ios-arrow-forward' : 'ios-arrow-back'"
              shape="circle"
            ></Button>
            <Menu
              ref="side_menu"
              theme="dark"
              @on-select="jump"
              :active-name="activeMenu"
              :open-names="openNames"
            >
              <Submenu
                :name="'/' + d.url"
                :data-id="'/' + d.url"
                v-for="(d, index) in menuList"
                :key="d.id"
              >
                <template slot="title">
                  <Icon :type="iconFont(index)" /> {{ d.vcName }}
                </template>
                <MenuItem
                  :name="'/' + li.url"
                  :data-id="'/' + li.url"
                  v-for="(li, inx) in d.subList"
                  :key="li.id"
                  >{{ li.vcName }}</MenuItem
                >
              </Submenu>
            </Menu>
          </Sider>
          <Layout :style="{ padding: '0 24px 24px' }">
            <!-- 面包屑 -->
            <Breadcrumb :style="{ margin: '15px 0' }">
              <BreadcrumbItem to="/home">
                <Icon type="ios-home-outline"></Icon> 首页
              </BreadcrumbItem>
              <BreadcrumbItem
                :to="b.path"
                v-for="(b, index) in breadcrumbList"
                :key="b.label"
                >{{ b.label }}</BreadcrumbItem
              >
            </Breadcrumb>
            <!-- 公共部分 -->
            <Content :style="{ padding: '24px', background: '#fff' }">
              <router-view></router-view>
            </Content>
          </Layout>
        </Layout>
      </div>
      <div
        class="side_back_bar"
        :class="{ navAnimation: isNavShow, navHide: !isNavShow }"
      ></div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/header";
import { RouterMap } from "@/lib/menu.js";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  data() {
    return {
      vcMenuName: "",
      isNavShow: false,
      msg: "",
      menuList: [],
      iconList: [
        "ios-cog",
        "md-swap",
        "logo-buffer",
        "md-desktop",
        "ios-create",
        "md-bookmarks",
      ],
      userName: "",
      menuMap: RouterMap,
      activeMenu: "/sys/user",
      openNames: ["sys"],
      dataResourceUrl: "",
    };
  },
  components: {
    CommonHeader,
  },
  created() {
    // 登陆后初始化token
    axios.defaults.headers.common["token"] = Cookies.get("user_token");
    // 初始化menu选中状态
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  computed: {
    // 计算面包屑
    breadcrumbList() {
      const path = this.currentPath.path;
      if (!path) {
        return [];
      }
      const arr = this.menuMap.filter((e) => {
        if (path.indexOf(e.path) === 0) {
          return true;
        }
        return false;
      });

      if (arr.length > 0) {
        const matchedArr = [];
        const pathArr = path.split("/");
        matchedArr.push({
          label: arr[0].label,
          path: arr[0].path,
        });

        if (path.split(arr[0].path)[1] !== "") {
          if (arr[0].children && arr[0].children.length != 0) {
            const currentMenu = arr[0].children.filter((e) => {
              if (pathArr[pathArr.length - 1] == e.path) {
                return true;
              } else {
                return false;
              }
            });

            matchedArr.push({
              label: currentMenu[0].label,
              path: currentMenu[0].path,
            });
          }
        }
        return matchedArr;
      }
      return arr;
    },
    currentPathName() {
      return this.$route.matched[1].path;
    },
  },
  mounted() {
    this.getMenuList();
    this._getDataResourceUrl();
    // 后台没有获取用户信息接口，暂时存在本地
    if (this.userName == "") {
      this.userName = Cookies.get("user_name");
    }
  },

  destroyed() {},
  watch: {
    "$route.name": {
      deep: true,
      handler(pathName) {
        //  获取 url 前缀 如 /sys/
        const str = this.$route.path;
        const prefix = str.substring(0, str.lastIndexOf("/") + 1);
        //  拼接 /sys/role
        this.$refs.side_menu.currentActiveName = prefix + pathName;
      },
    },
    vcMenuName(val) {},
  },
  methods: {
    getMenuList() {},
    // 侧边栏利用name跳转，用url跳转会有重叠路径问题
    jump(name) {
      let path = name.split("/");
      path = path[path.length - 1];
      console.log(path);
      if (path == "resource") {
        // this._loginGrafana()
        window.open(this.dataResourceUrl);
        return;
      }
      this.$router.push({ name: path });
      this.$pageScrollTop();
      //  Cookies.set('user_name', this.loginName, { expires: 1 })
    },
    onClear() {},
    // 异步手动展开菜单
    updataMenuActive() {
      const openNames = this.$route.matched[0].path;
      this.activeMenu = this.$route.matched[1].path;
      this.openNames = [openNames];
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      });
    },
  },
};
</script>
<style lang="less">
.wrapper {
  background: #eee;
  overflow: hidden;
  & > .wrapper-container {
    background: #fff;
    margin-top: 65px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    & > .wrap-row {
      position: relative;
      margin-left: 0;
      margin-right: 0;
      height: auto;
      zoom: 1;
      display: block;
    }
  }
}
.navAnimation {
  // position: absolute;
  transform: translate(-240px, 0);
  transition: all 0.5s;
}
.ivu-layout-sider.navAnimation {
  position: absolute;
}
.navHide {
  left: 0;
  transition: all 0.3s ease-in-out;
}
.btnColor {
  color: #373e4e;
  position: absolute;
  top: 150px;
  left: 240px;
}
.main-content {
  position: absolute;
  left: 240px;
  width: 100%;
}

.ivu-menu-light {
  &:before {
    content: "";
    display: block;
    width: 240px;
    position: fixed;
    bottom: 0;
    top: 0;
    z-index: -1;
    top: 80px;
    border: 1px solid #dcdee2;
    border-width: 0 1px 0 0;
  }
}

.breadcrumb-wrap {
  padding-left: 20px;
  padding-top: 15px;
  margin-bottom: 20px;
}

.side_back_bar {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #363e4f;
  top: 0;
  left: 0;
  width: 240px;
}
.ivu-layout.ivu-layout-has-sider > .ivu-layout {
  min-height: calc(100vh - 65px);
  overflow: hidden;
}

.query /deep/ .ivu-input-wrapper {
  // border: 1px solid #fff;
  z-index: 99;
  margin: 5px;
  margin-bottom: 10px;
}
.query /deep/ .ivu-input {
  height: 28px;
  line-height: 28px;
}
.query /deep/ .ivu-btn {
  z-index: 99;
  margin-top: 7px;
  position: absolute;
  margin-left: 3px;
}
</style>
