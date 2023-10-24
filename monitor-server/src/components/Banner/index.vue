<template>
  <div class="slideshow">
    <!-- Swiper -->
    <div class="swiper-container">
      <swiper ref="mySwiper" :options="swiperOptions" class="swiper-container">
        <swiper-slide
          class="swiper-slide"
          v-for="item in imgArr"
          :key="item.url"
        >
          <h2>{{ item.name }}</h2>
          <img :src="item.url" alt />
        </swiper-slide>
        <!-- 轮播按钮-->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="w1200">
      <div class="login">
        <div class="login-btn">
          <div class="login-btn-bg" @click="jmpuTo(0)">
            <img src="../../assets/Home.png" alt />
            <button btn-type="firm">企业入口</button>
          </div>
          <div class="login-btn-bg" @click="jmpuTo(1)">
            <img src="../../assets/Thumbnails.png" alt />
            <button btn-type="organization">金融机构入口</button>
          </div>
          <div class="today-open">
            <h1><span></span>今日开标</h1>
            <a href="javascript:;" @click="jump">更多&gt;&gt;</a>
          </div>
          <ul class="bidRank">
            <li
              v-for="item in filterItem"
              :key="item.projectCode"
              @click="toOpenDetail(item.projectCode)"
            >
              <a href="#"> <i></i>{{ item.projectName }} </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { getBannerList, getOpenProject } from "@/api/index";
import { mapState } from "vuex";
import silde1 from "@/assets/silde1.jpg";
import silde2 from "@/assets/silde2.jpg";
import silde3 from "@/assets/silde3.jpg";
export default {
  name: "common-banner",
  data() {
    return {
      imgArr: [
        {
          url: silde1,
          name: "",
        },
        {
          url: silde2,
          name: "数字保函服务系统",
        },
        {
          url: silde3,
          name: "数字金融服务平台",
        },
      ],
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      openList: [],
    };
  },
  computed: {
    ...mapState(["selectCity"]),
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    filterItem() {
      return this.openList.slice(0, 4);
    },
  },
  watch: {
    selectCity() {
      this._getBanner();
      this._getOpenProject();
    },
  },
  created() {
    this._getBanner();
    this._getOpenProject();
  },
  methods: {
    _getBanner() {
      getBannerList({
        bannerType: 0,
        // citycode: this.selectCity.code
      }).then((res) => {
        res.data.forEach((item) => {
          item.url = item.pictureUrl;
          item.name = item.link;
        });
        this.imgArr = res.data;
      });
    },
    _getOpenProject() {
      getOpenProject({
        citycode: this.selectCity.code,
        info: {
          pageNo: 1,
          pageSize: 10,
        },
      }).then((res) => {
        if (res.code === 200) {
          this.openList = res.data.records;
        } else {
          this.$Message.error({ content: res.message });
        }
      });
    },
    initBanner() {
      // // pagination: {
      // //   el: '.swiper-container1'
      // // },
      // slidesPerView: "auto",
      // // slidesPerView: 4,
      // loopFillGroupWithBlank: true,
      // // loop: true,
      // autoplay: {
      //   delay: 3000
      // },
      // navigation: {
      //   nextEl: ".swiper-button-next1",
      //   prevEl: ".swiper-button-prev1"
      // }
    },
    jmpuTo(type) {
      if (!Cookies.get("userInfo")) {
        this.$router.push({ path: "/login", query: { type: type } });
        return;
      }
      const userType = JSON.parse(Cookies.get("userInfo")).userType;
      console.log(userType);
      if (type === 0 && userType === 1) {
        this.$Message.error({
          content: "请先正常退出承保人端，再进入投保人端！",
        });
        return;
      } else if (type === 1 && userType === 0) {
        this.$Message.error({
          content: "请先正常退出投保人端，再进入承保人端！",
        });
        return;
      }
      if (!type) {
        this.$router.push({ path: "/insureRecode" });
      } else {
        this.$router.push({ path: "/acceptInsureRecode" });
      }
    },
    jump() {
      this.$router.push({ path: "/tendering" });
    },
  },
};
</script>
<style lang="less">
.slideshow {
  width: 100%;
  height: 463px;
  position: relative;
}
.slideshow .w1200 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.slideshow .swiper-pagination-bullet {
  width: 16px;
  height: 16px;
  background: #ecf1f9;
  opacity: 0.9;
}
.slideshow .swiper-container {
  width: 100%;
  min-width: 1200px;
}
.slideshow .swiper-slide {
  width: 100%;
}
.slideshow .swiper-slide img {
  width: 100%;
  height: 463px;
}
.slideshow .swiper-pagination-bullet-active {
  width: 40px;
  border-radius: 8px;
  background: #fff;
}
.slideshow h2 {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 50%);
  color: #fff;
  font-size: 60px;
  letter-spacing: 15px;
  width: 900px;
}
.login {
  width: 294px;
  height: 350px;
  background: rgba(255, 255, 255, 0.86);
  position: absolute;
  z-index: 1;
  top: 65px;
  right: 0;
  border-radius: 8px;
  padding: 10px 25px;
  box-sizing: border-box;
}
.login .login-btn-bg {
  width: 240px;
  height: 46px;
  background: #0646a5;
  border-radius: 10px;
  color: #fff;
  font-size: 0;
  margin: 20px auto 0;
  cursor: pointer;
}
.login .login-btn-bg:hover {
  background-color: #06408a;
}
.login .login-btn-bg img {
  display: inline-block;
  margin-left: 34px;
  vertical-align: top;
  margin-top: 10px;
}
.login .login-btn-bg button {
  display: inline-block;
  font-size: 20px;
  line-height: 46px;
  vertical-align: middle;
  margin-left: 18px;
  cursor: pointer;
}
.login ul {
  line-height: 30px;
}
.login ul li {
  font-size: 14px;
  height: 33px;
  line-height: 33px;
  width: 245px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
}
.login ul li:hover > a {
  color: #064396;
}
.login ul li:hover > a > i {
  background-color: #064396;
}
.login ul li a {
  color: #5d5d5d;
  font-size: 14px;
  display: inline-block;
  width: 235px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
}
.login ul li a > i {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #bfbfbf;
  margin-right: 4px;
  margin-top: 13px;
  vertical-align: top;
}

.slideshow a {
  color: #212121;
}

.slideshow button {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  background: transparent;
}

.today-open {
  margin-top: 27px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e9;
}
.today-open h1 {
  font-size: 18px;
  display: inline-block;
  color: #000;
}
.today-open h1 span {
  background: #064396;
  width: 3px;
  height: 18px;
  display: inline-block;
  margin-right: 15px;
  margin-top: 4px;
  vertical-align: top;
}
.today-open a {
  float: right;
  color: #7a7a7a;
  font-size: 15px;
  vertical-align: top;
  margin-top: 3px;
}
</style>
