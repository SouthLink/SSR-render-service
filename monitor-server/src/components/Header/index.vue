<template>
  <div>
    <div class="top">
      <div class="w1200">
        <span>您好！欢迎来到全国电子保函服务平台！</span>
        <div class="date">{{ date }}</div>
        <AreaSelect style="float: right" v-if="isMainWeb" />
      </div>
    </div>
    <div class="title-name">
      <div class="w1200">
        <div class="zbhlogo"></div>
        <div class="nav">
          <ul>
            <li>
              <router-link to="/">
                <a href="!#">首页</a>
              </router-link>
            </li>
            <li>
              <router-link to="/information">资讯中心</router-link>
              <!-- <ul>
                <li>
                  <a href="#">二级菜单</a>
                </li>
              </ul>-->
            </li>
            <li>
              <router-link to="/product">产品中心</router-link>
            </li>
            <li>
              <router-link to="/tendering">招标信息</router-link>
            </li>
            <li>
              <router-link to="/guarantee">保函查验</router-link>
            </li>
            <li>
              <router-link to="/financeDesc">金融机构</router-link>
            </li>
            <li>
              <router-link to="/credit">信用中心</router-link>
            </li>
            <li>
              <router-link to="/about">关于我们</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../../utils/day";
import AreaSelect from "../AreaSelect";
export default {
  name: "common-header",
  components: {
    AreaSelect,
  },
  data() {
    return {
      date: "",
    };
  },
  computed: {
    isMainWeb() {
      return /www\.dlzbh\.com/i.test(window.location.href);
    },
  },
  methods: {},
  mounted() {
    setInterval(() => {
      this.date = formatDate("YYYY年MM月DD日 hh:mm:ss dddd", new Date());
    }, 1000);
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.w1200 {
  width: 1200px;
  margin: 0 auto;
}

.top {
  background: #333;
  height: 41px;
  color: #ffffff;
  width: 100%;
  min-width: 1200px;
}
.top span {
  display: inline-block;
  line-height: 40px;
}
.top .date {
  float: right;
  line-height: 40px;
}

.title-name {
  background: url(./img/titleImg.png) no-repeat center;
  width: 100%;
  height: 106px;
  font-size: 0;
  min-width: 1200px;
}

.zbhlogo {
  display: inline-block;
  background: url(./img/zbhlogo.png) no-repeat left center;
  width: 189px;
  height: 106px;
  vertical-align: top;
}

.nav {
  float: right;
}
.nav ul {
  font-size: 0;
}
.nav ul li {
  font-size: 18px;
  display: inline-block;
  margin-left: 50px;
  line-height: 106px;
}
.nav ul li a {
  color: #212121;
}
.nav ul li ul {
  display: none;
}
</style>
