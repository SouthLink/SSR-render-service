<template>
  <div>
    <div class="footer">
      <div class="w1200">
        <div class="footer-top">
          <div class="footer-content">
            <h1>中保函（大连）科技有限公司</h1>
            <p>
              公司地址： 大连市沙河口区西南路888号梦想长廊E103室
              <br />办公电话：0411-62908082 <br />公司邮箱：dlzbhkj@163.com
              <br />商务联系：0411-62908082
            </p>
          </div>
          <div class="footer-code">
            <img style="width: 160px" src="../../assets/code.jpg" alt />
            <p>关注微信公众号</p>
          </div>
        </div>
        <div class="footer-bottom">
          <ul class="">
            <li>
              <a href="#">关于我们</a>
            </li>
            <i></i>
            <li>
              <a href="#">帮助中心</a>
            </li>
            <i></i>
            <li>
              <a href="#">安全保障</a>
            </li>
            <i></i>
            <li>
              <a href="#">联系我们</a>
            </li>
            <i></i>
            <li>
              <a href="#">规则中心</a>
            </li>
            <i></i>
            <li>
              <a href="#">投诉建议</a>
            </li>
            <i></i>
            <li>
              <a href="#">网站地图</a>
            </li>
          </ul>
          <span
            >辽ICP备20003126号-1 Copyright © ZBH CO. LTD. All Rights
            Reserve</span
          >
          <p>
            声明：本平台仅提供技术支持（广告展示和引流服务），所有保函产品均由保函签发金融机构提供。
          </p>
        </div>
      </div>
    </div>

    <div class="position">
      <div class="position-function-box">
        <div class="position-function">
          <div class="position-function-tooltip">
            <span>点击咨询</span>
            <i></i>
          </div>
        </div>
      </div>
      <div class="position-function-box">
        <div class="position-function">
          <div class="position-function-tooltip">
            <span>联系电话: 0411-62908082</span>
            <i></i>
          </div>
        </div>
      </div>
      <div class="position-function-box">
        <div class="position-function">
          <div class="position-function-tooltip" data-type="help">
            <span>点击帮助</span>
            <i></i>
          </div>
        </div>
      </div>
      <div class="position-function-box">
        <div class="position-function backTop" style="display: none"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "common-footer",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less">
.footer {
  background: #383d49;
  padding: 30px 0;
  font-size: 0;
}
.footer-top {
  display: flex;
  justify-content: space-between;
}
.footer .footer-code {
  display: inline-block;
  vertical-align: top;
  margin-top: 20px;
  margin-right: 30px;
}
.footer .footer-code p {
  font-size: 16px;
  color: #fff;
  padding-top: 10px;
}
.footer .footer-content {
  display: inline-block;
  vertical-align: top;
  margin: 20px 30px 0 20px;
}
.footer .footer-content h1 {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
}
.footer .footer-content p {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  margin-top: 10px;
}
.footer .footer-bottom {
  display: inline-block;
  width: 100%;
  text-align: center;
}
.footer .footer-bottom ul {
  font-size: 0;
  margin: 20px 0 0 30px;
}
.footer .footer-bottom ul li {
  display: inline-block;
  font-size: 16px;
  vertical-align: middle;
}
.footer .footer-bottom ul li a {
  color: #ffffff;
}
.footer .footer-bottom ul i {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: #bfc0c3;
  margin: 0 6px;
  vertical-align: middle;
}
.footer .footer-bottom span {
  display: block;
  color: #898e98;
  font-size: 14px;
  letter-spacing: 0.5px;
  padding: 10px 0;
  margin-left: 30px;
}
.footer .footer-bottom p {
  color: #707685;
  font-size: 14px;
  line-height: 24px;
  padding-top: 10px;
  margin-left: 30px;
}

.position {
  position: fixed;
  top: 40%;
  right: 0;
  z-index: 666;
  width: 48px;
}
.position .position-function-box {
  background: #888;
  margin-top: 3px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.position .position-function-box .position-function {
  width: 48px;
  height: 48px;
  background: url(./img/message.png) no-repeat center center;
  position: relative;
}
.position .position-function-box .position-function .position-function-tooltip {
  position: absolute;
  left: -168px;
  transition: all 1s;
  display: none;
}
.position
  .position-function-box
  .position-function
  .position-function-tooltip
  span {
  width: 160px;
  height: 48px;
  line-height: 48px;
  background: #888;
  text-align: center;
  color: #fff;
  border-radius: 4px;
  transition: all 1s;
  cursor: pointer;
  display: inline-block;
}
.position
  .position-function-box
  .position-function
  .position-function-tooltip
  i {
  float: right;
  width: 0;
  height: 0;
  margin-top: 20px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #888;
}
.position
  .position-function-box
  .position-function:hover
  .position-function-tooltip {
  display: block;
}
.position .position-function-box:nth-child(2) .position-function {
  background: url(./img/tel.png) no-repeat center center;
}
.position .position-function-box:nth-child(3) .position-function {
  background: url(./img/help.png) no-repeat center center;
}
.position .position-function-box:nth-child(4) .position-function {
  background: url(./img/top.png) no-repeat center center;
}
</style>
