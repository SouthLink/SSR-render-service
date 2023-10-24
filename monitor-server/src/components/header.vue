<template>
  <header>
    <div class="topbar-brand">
      <img src="logo" alt="" />
    </div>
    <div class="topbar-nav">
      <ul>
        <li class="nav-li">
          <a @click="showPwdAlterModal = true">
            <Icon type="md-lock" size="22" /> 修改密码
            <span></span>
          </a>
        </li>
        <li class="nav-li nav-avatar">
          <a href="javascript:;">
            <span></span>
            <span class="avatar">
              <Avatar icon="ios-person" :style="{ background: color }" />
              <span class="user-name">{{ userName }}</span>
            </span>
          </a>
        </li>
        <li class="nav-li">
          <a href="javascript:;" @click="signOut()">
            <Icon class="cursor-p" type="ios-log-out" size="25" />
          </a>
        </li>
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
        <FormItem prop="OLD_PASSWORD" label="原密码">
          <Input
            type="password"
            class="width-280"
            v-model="pwdAlterForm.OLD_PASSWORD"
            placeholder="请输入原密码"
          ></Input>
        </FormItem>
        <FormItem prop="NEW_PASSWORD" label="新密码">
          <Input
            type="password"
            class="width-280"
            v-model="pwdAlterForm.NEW_PASSWORD"
            placeholder="请输入新密码"
          ></Input>
        </FormItem>
        <FormItem prop="CONFIRM_PASSWORD" label="确认密码">
          <Input
            type="password"
            class="width-280"
            v-model="pwdAlterForm.CONFIRM_PASSWORD"
            placeholder="请确认新密码"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showPwdAlterModal = false" type="text">取消</Button>
        <Button @click="alterUserPassword('pwdAlterForm')" type="primary"
          >提交</Button
        >
      </div>
    </Modal>
  </header>
</template>
<script>
export default {
  data() {
    const validateIsSame = (rule, value, callback) => {
      if (value.length < 6 || value.length > 20) {
        return callback(new Error("密码长度为6-20位"));
      }
      if (this.pwdAlterForm.NEW_PASSWORD !== value) {
        callback(new Error("两次新密码输入不一致"));
        return;
      }
      callback();
    };
    return {
      user: {},
      color: "#ffbf00",
      showPwdAlterModal: false,
      pwdAlterForm: {
        OLD_PASSWORD: "",
        NEW_PASSWORD: "",
        CONFIRM_PASSWORD: "",
      },
      pwdAlterFormRules: {
        OLD_PASSWORD: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        NEW_PASSWORD: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        CONFIRM_PASSWORD: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateIsSame, trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  mounted() {},
  props: {
    userName: "",
  },
  methods: {
    modalVisibleChange(flag) {
      if (this.showPwdAlterModal) return;
      this.$refs.pwdAlterForm.resetFields();
      for (const item of Object.keys(this.pwdAlterForm)) {
        this.pwdAlterForm[item] = "";
      }
    },
    signOut() {
      this.$Modal.confirm({
        title: "提示",
        content: "此操作将退出系统, 是否继续?",
        onOk: () => {
          this.$emit("signOut");
        },
        onCancel: () => {},
      });
    },
    alterUserPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.update();
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
header {
  position: fixed;
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
        padding: 0 16px;
        display: block;
        color: #999;
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
