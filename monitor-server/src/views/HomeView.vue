<template>
  <div class="wrapper">
    <common-header
      :user-name="userName"
      @signOut="signOut()"
      @bindCa="bindCa()"
    />
    <div class="wrapper-container" style="margin-top: 65px">
      <div class="wrap-row">
        <Layout>
          <!-- 侧边栏 -->
          <Sider
            ref="sidebar"
            hide-trigger
            collapsible
            :class="{ isCollapsed: !isCollapsed }"
            :collapsed-width="78"
            v-model.trim="isCollapsed"
          >
            <div class="scale-btn">
              <!-- src="../assets/menu_scalc.png" -->
              <img
                alt
                @click="collapsedSider"
                :icon="isNavShow ? 'ios-arrow-forward' : 'ios-arrow-back'"
              />
            </div>
            <!-- 菜单 -->
            <Menu
              v-show="!isCollapsed"
              ref="side_menu"
              theme="dark"
              @on-select="jump"
              :active-name="activeMenu"
              :open-names="openNames"
            >
              <Submenu
                :name="d.url"
                :data-id="d.url"
                v-for="(d, index) in getMenu"
                :key="d.url"
              >
                <template slot="title">
                  <Icon :type="iconFont(index)" />
                  {{ d.label }}
                </template>
                <MenuItem
                  :name="li.url"
                  :data-id="li.url"
                  v-for="li in d.children"
                  :key="li.url"
                  >{{ li.label }}</MenuItem
                >
              </Submenu>
            </Menu>
            <!-- 菜单收缩模式下拉框 -->
            <div class="dropdown-wrap" v-if="isCollapsed">
              <div class="dropdown-content">
                <!-- 一级下拉菜单 -->
                <template v-for="(d, index) in menuList">
                  <Dropdown
                    :key="index"
                    v-if="d.subList"
                    placement="right-start"
                    @on-click="dropdownSelect"
                  >
                    <Button class="dropdown-btn" type="text">
                      <Icon :size="25" :type="iconList[index]" />
                    </Button>
                    <!-- 超级管理员二级下拉菜单 -->
                    <DropdownMenu class="dropdown-menu" slot="list">
                      <DropdownItem
                        :name="child.url"
                        :key="child.id"
                        v-for="child in d.subList"
                        v-if="!child.subList"
                      >
                        <div class="dropdown-child-wapper">
                          <Icon
                            :size="16"
                            :type="iconList[index]"
                            v-if="child.subList"
                          />
                          <span class="dropdown-child-text">{{
                            child.vcName
                          }}</span>
                        </div>
                      </DropdownItem>
                      <!-- 二、三级下拉菜单 -->
                    </DropdownMenu>
                  </Dropdown>
                </template>
              </div>
            </div>
          </Sider>

          <Layout :style="{ padding: '0 24px 24px', marginTop: '25px' }">
            <!-- 面包屑 -->
            <!-- <Breadcrumb :style="{margin: '15px 0'}">
              <BreadcrumbItem to="/home">
                <Icon type="ios-home-outline" /> 首页
              </BreadcrumbItem>
              <BreadcrumbItem
                :to="b.path"
                v-for="(b, index) in breadcrumbList"
                :key="b.label">
                {{ b.label }}
              </BreadcrumbItem>
            </Breadcrumb>-->
            <!-- 公共部分 -->
            <Content
              class="content"
              :style="{
                padding: '24px',
                background: '#fff',
                position: 'relative',
              }"
            >
              <router-view />
            </Content>
          </Layout>
        </Layout>
        <!-- <Modal></Modal> -->
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { routes } from "@/router/index";
import CommonHeader from "@/components/BackHeader/index.js";
// import RouterMap from "@/router/menu/index";
import { checkInsurance } from "@/api/insurer";
import { getCaRand, bindCa } from "../api/index";

export default {
  data() {
    return {
      isNavShow: false,
      isCollapsed: false,
      msg: "",
      menuList: "",
      iconList: [
        "md-desktop",
        "md-git-branch",
        "logo-buffer",
        "ios-flask",
        "ios-send",
        "ios-cog",
        "md-filing",
      ],
      userName: "",
      // menuMap: RouterMap,
      menuMap: [],
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
    axios.defaults.headers.common["token"] = this.getInfo
      ? JSON.parse(Cookies.get("userInfo")).token
      : "";
    this.getDist();
  },
  computed: {
    getInfo() {
      return Cookies.get("userInfo")
        ? JSON.parse(Cookies.get("userInfo"))
        : null;
    },
    getMenu() {
      console.log(routes);
      return routes;
    },
    // 计算面包屑
    breadcrumbList() {
      const path = this.currentPath.path;
      if (!path) {
        return [];
      }
      const arr = this.menuMap.filter((e) => {
        if (e.path === "/") return false;
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

        console.log(matchedArr);
        // 新增处理 '/task/taskconfig' 情况
        if (
          path.split(arr[0].path)[1] !== "" ||
          (path.split(arr[0].path)[2] && path.split(arr[0].path)[2] !== "")
        ) {
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
    this.updataMenuActive();
  },

  destroyed() {},
  watch: {
    // "$route.name": {
    //   deep: true,
    //   handler(pathName) {
    //     //  获取 url 前缀 如 /sys/
    //     const str = this.$route.path;
    //     const prefix = str.substring(0, str.lastIndexOf("/") + 1);
    //     //  拼接 /sys/role
    //     this.$refs.side_menu.currentActiveName = prefix + pathName;
    //   }
    // }
  },
  methods: {
    ...mapActions(["getDist"]),
    bindCa() {
      const info = JSON.parse(Cookies.get("userInfo"));
      getCaRand()
        .then((res) => {
          if (res.code === 200) {
            var rtn = this.signRandAndRtnOUA(res.data);
            bindCa({
              randText: res.data,
              signCert: rtn.signCert,
              userType: info.userType,
              signedData: rtn.signedRand,
            })
              .then((res) => {
                if (res.code === 200) {
                  this.$Message.success({ content: "绑定成功" });
                } else {
                  this.$Message.error({ content: res.message });
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    signRandAndRtnOUA(randData) {
      var km = new ActiveXObject("JHKey.KeyManager");
      var ks1 = new ActiveXObject("JHKey.KeyStore");
      var cert1 = new ActiveXObject("JHKey.Cert");

      if (randData == "") {
        alert("握手随机数为空");
        return;
      }

      km.EnumKeyStore(); //调用EnumKeyStore枚举出所有证书
      var isSel = km.ShowCertsDlg(3, 1); //显示证书列表框，用于让用户选取证书。、
      //第二个参数表示证书用途，1：签名，2：加密，3：签名加密均可
      if (isSel) {
        alert("未选择任何证书");
        return;
      }
      km.InitKeyStore(ks1); //根据用户选择的证书，初始化UKey操作类KeyStore
      km.GetSelectedCert(cert1); //根据用户的选择得到指定的证书
      var ouA = "";
      ouA = cert1.CertOuA;
      if (ks1.SignData(randData)) {
        //进行签名
        alert("签名握手随机数失败\n");
        return;
      }
      var signedData = ks1.GetSignData(); //签名后取得签名数据
      return {
        signCert: ks1.GetCertBase64(),
        signCertOUA: ouA,
        signedRand: signedData,
      };
    },
    onMessage(msg) {
      this.websocketTransfer(msg);
    },
    // 收起展开侧边栏
    collapsedSider() {
      this.$refs.sidebar.toggleCollapse();
    },
    // 下拉菜单点击跳转
    dropdownSelect(url) {
      if (url === void 0) return;
      this.jump(url);
    },
    iconFont(inx) {
      return this.iconList[inx];
    },
    // 退出登录
    signOut() {
      logOut({}).then((res) => {});
    },
    // 侧边栏利用name跳转，用url跳转会有重叠路径问题
    jump(name) {
      // let path = name.split("/");
      // path = path[path.length - 1];
      // if (path == "resource") {
      //   window.open(this.dataResourceUrl);
      //   return;
      // }
      this.$router.push({ path: name });
      // this.$pageScrollTop();
    },
    // 异步手动展开菜单
    updataMenuActive() {
      console.log(this.$route.matched);
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

.collapsed-icon {
  display: block;
  top: 0px;
  right: 20px;
  z-index: 9999;
  text-align: center;
  cursor: pointer;
  color: #fff;
}

.is-icon-collapsed {
  text-align: right;
  line-height: 35px;
  padding-right: 20px;
}

.dropdown-wrap {
  .dropdown-content {
    .dropdown-btn {
      width: 78px;
    }
    .ivu-btn-text {
      color: #fff;
    }
    .ivu-btn-text:hover {
      color: #57a3f3;
    }
  }
}

.scale-btn {
  background-color: #363e4f;
  height: 40px;
  line-height: 40px;
  text-align: center;
  z-index: 1;
  position: relative;
  img {
    width: 25px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    cursor: pointer;
  }
}

.main-content {
  position: absolute;
  left: 240px;
  width: 100%;
}

.isCollapsed {
  width: 240px !important;
  min-width: 240px !important;
  max-width: 240px !important;
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
  z-index: 0;
}

.ivu-layout-sider {
  background: #363e4f !important;
}

.ivu-dropdown-menu {
  min-width: 120px;
}

.ivu-breadcrumb a {
  font-family: "MicrosoftYaHei", "Microsoft YaHei";
  // font-weight: bold;
  font-style: normal;
  font-size: 12px;
  color: #666666;
}

.ivu-breadcrumb a i {
  font-size: 16px;
  vertical-align: sub;
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

.ivu-menu-vertical {
  width: auto !important;
}

.ivu-layout.ivu-layout-has-sider > .ivu-layout {
  min-height: calc(100vh - 65px);
  overflow: hidden;
}

.content {
  min-height: calc(100vh - 150px);
  // overflow: hidden;
}

.ivu-layout-sider {
  float: left;
}
.ivu-layout-sider-children {
  height: 91vh;
}
</style>
