<template>
  <header>
    <div class="topbar-brand">
      前端监控平台
      <!-- <p>迅策 VONE</p>
      <span class="title-position">VISION</span>
      <span class="title-describe">全域资产管理生态系统</span> -->
    </div>
    <div class="topbar-nav">
      <ul>
        <!-- <li class="nav-li">
          <a @click="showPwdAlterModal = true">
            <Icon
              type="md-lock"
              size="22" /> 修改密码
            <span />
          </a>
        </li> -->
        <li class="nav-li">
          <CommonMessage />
        </li>
        <li class="nav-li nav-avatar">
          <a href="javascript:;">
            <span />
            <span class="avatar">
              <Avatar icon="ios-person" :style="{ background: color }" />
              <span class="user-name">
                {{ userName }}
              </span>
              <Dropdown trigger="click" @on-click="bindCa">
                <a href="javascript:void(0)">
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-if="isIE" name="ca">绑定CA</DropdownItem>
                  <DropdownItem name="change">修改密码</DropdownItem>
                  <DropdownItem name="back">返回官网</DropdownItem>
                  <DropdownItem name="out">退出系统</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
          </a>
        </li>
        <!-- <li class="nav-li monitor-topic">
          <span
            class="cursor-p"
            @click="help"
            :style="{verticalAlign: '-1px'}">
            帮助
          </span>
        </li> -->
        <!-- <li class="nav-li">
          <a
            href="javascript:;"
            @click="signOut()">
            <Icon
              class="cursor-p"
              type="ios-log-out"
              size="25" />
          </a>
        </li> -->
      </ul>
    </div>
    <Modal
      class="user-modal"
      v-model="showPwdAlterModal"
      title="修改密码"
      width="450"
      @on-visible-change="modalVisibleChange()"
    >
      <Form
        class="width-350 margin-center"
        ref="pwdAlterForm"
        :model="pwdAlterForm"
        :rules="pwdAlterFormRules"
        :label-width="100"
      >
        <FormItem prop="oldPwd" label="原密码">
          <Input
            type="password"
            class="width-280"
            v-model="pwdAlterForm.oldPwd"
            placeholder="请输入原密码"
          />
        </FormItem>
        <FormItem prop="newPwd" label="新密码">
          <Input
            type="password"
            class="width-280"
            v-model="pwdAlterForm.newPwd"
            placeholder="请输入新密码"
          />
        </FormItem>
        <FormItem prop="replyNewPwd" label="确认密码">
          <Input
            type="password"
            class="width-280"
            v-model="pwdAlterForm.replyNewPwd"
            placeholder="请确认新密码"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showPwdAlterModal = false" type="text"> 取消 </Button>
        <Button @click="alterUserPassword('pwdAlterForm')" type="primary">
          提交
        </Button>
      </div>
    </Modal>
  </header>
</template>
<script>
import Cookies from "js-cookie";
import { loginOut, updateUserPwd } from "@/api/index";
import CommonMessage from "@/components/Message/index";
export default {
  data() {
    const validateIsSame = (rule, value, callback) => {
      if (
        !/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/.test(
          value
        )
      ) {
        return callback(
          new Error("密码必须包含字母数字或特殊字符，长度为6-20位")
        );
      }
      if (value.length > 20) {
        return callback(new Error("密码长度为6-20位"));
      }
      if (this.pwdAlterForm.newPwd !== value) {
        callback(new Error("两次新密码输入不一致"));
        return;
      }
      callback();
    };
    return {
      color: "#ffbf00",
      showPwdAlterModal: false,
      pwdAlterForm: {
        oldPwd: "",
        newPwd: "",
        replyNewPwd: "",
      },
      pwdAlterFormRules: {
        oldPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        replyNewPwd: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateIsSame, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    isIE() {
      const inBrowser = typeof window !== "undefined";
      const UA = inBrowser && window.navigator.userAgent.toLowerCase();
      return UA && /msie|trident/.test(UA);
    },
  },
  components: { CommonMessage },
  watch: {},
  created() {},
  mounted() {},
  props: {
    userName: {
      type: [String, Number],
      default: "",
    },
  },
  methods: {
    bindCa(type) {
      if (type === "ca") {
        this.$emit("bindCa");
      }
      if (type === "back") {
        this.$router.push({ path: "/" });
      }
      if (type === "change") {
        this.showPwdAlterModal = true;
      }
      if (type === "out") {
        this.signOut();
      }
    },
    signOut() {
      this.$Modal.confirm({
        title: "提示",
        content: "此操作将退出系统, 是否继续?",
        onOk: () => {
          this.out();
        },
      });
    },
    // 退出登录
    out() {
      loginOut({}).then((res) => {
        const type = JSON.parse(Cookies.get("userInfo")).userType;
        Cookies.remove("userInfo");
        this.$router.push({ path: "/login", query: { type: type } });
      });
    },
    alterUserPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.update();
        }
      });
    },
    modalVisibleChange() {
      if (this.showPwdAlterModal) {
        return;
      }
      this.$refs.pwdAlterForm.resetFields();
      for (const item of Object.keys(this.pwdAlterForm)) {
        this.pwdAlterForm[item] = "";
      }
    },
    update() {
      const userId = Cookies.get("user_id");
      const self = this;
      updateUserPwd({
        oldPwd: this.pwdAlterForm.oldPwd,
        newPwd: this.pwdAlterForm.newPwd,
        replyNewPwd: this.pwdAlterForm.replyNewPwd,
      }).then(() => {
        self.showPwdAlterModal = false;
        self.$Message.info("修改密码成功");
        setTimeout(() => {
          self.out();
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-bottom: 0;
  min-height: 65px;
  line-height: 65px;
  background: #363e4f;
  //  border: 1px solid #fff;
  border-color: #e9ecf3;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.05);
  & > .topbar-brand {
    float: left;
    font-family: "PingFangHK-Semibold", "PingFang HK Semibold", "PingFang HK";
    font-weight: 650;
    font-style: normal;
    font-size: 20px;
    color: #fff;
    padding-left: 35px;
  }
  & > .topbar-nav {
    float: right;
    margin-right: 10px;
    margin-bottom: 0;
    padding: 0;
    & > ul {
      margin-bottom: 0;
      padding: 0;
      list-style: none;
      & > li {
        float: left;
        position: relative;
        display: block;
      }
      & > .nav-avatar {
        margin-right: 10px;
      }
      a {
        height: 65px;
        line-height: 65px;
        padding: 0 10px;
        display: block;
        color: #999;
      }
      .monitor-topic {
        margin-right: 10px;
        &:last-child {
          margin-right: 0px;
        }
        span {
          color: #999;
          margin-right: 5px;
        }
      }
    }
  }
}

.user-name {
  margin-left: 5px;
}

.cursor-p {
  cursor: pointer;
}
</style>

<style>
.monitor-topic .ivu-icon {
  vertical-align: -3px;
}
</style>
