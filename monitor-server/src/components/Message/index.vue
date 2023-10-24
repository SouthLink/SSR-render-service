<template>
  <div>
    <a @click="handleShow">
      <span class="avatar notification-view">
        <span class="count">{{ total }}</span>
        <Avatar icon="ios-notifications" :style="{ background: color }" />
      </span>
    </a>
    <div v-if="showMessage" class="message-box">
      <div
        v-for="item in list"
        :key="item.id"
        class="message-item"
        @click="handleMessage(item)"
      >
        <h3>{{ item.title }}</h3>
        <div>{{ item.content }}</div>
      </div>
      <div class="page-view">
        <div
          v-for="page in pageList"
          :key="page"
          class="page-item"
          :class="{ active: page === current }"
          @click="changePage(page)"
        >
          {{ page }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { messagePage, readMessage } from "@/api/index";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      color: "ffbf00",
      showMessage: false,
      total: 0,
      pageNumber: 1,
      current: 1,
      list: [],
    };
  },
  created() {
    this.reqMessage();
    this.interval = setInterval(() => {
      this.reqMessage();
    }, 30 * 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    pageList() {
      return new Array(this.pageNumber).fill(0).map((o, i) => i + 1);
    },
  },
  methods: {
    handleShow() {
      if (this.total) {
        this.showMessage = !this.showMessage;
      }
      this.current = 1;
    },
    changePage(page) {
      this.current = page;
      this.reqMessage();
    },
    handleMessage() {
      if (this.$route.matched[0].path === "/back") {
        this.$router.push("/insureRecode");
      } else if (this.$route.matched[0].path === "/accept") {
        this.$router.push("/acceptInsureRecode");
      }
      this.showMessage = false;
    },
    reqMessage() {
      const userInfo = Cookies.get("userInfo");
      if (!userInfo) {
        return;
      }
      messagePage({
        pageNo: this.current,
        pageSize: 5,
        // sort: [],
        // orderField: [],
        // condition: {}
      }).then(({ data }) => {
        this.total = data.total;
        this.pageNumber = data.pages || 1;
        this.page = data.pageNum;
        this.list = data.records.map((o) => {
          const text = o.content.split(/\s/) || [];
          return {
            id: o.id,
            orderNo: o.orderNo,
            title: text[0] || "",
            content: text.slice(1).join(""),
          };
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.notification-view {
  user-select: none;
  position: relative;
  .count {
    display: inline-block;
    position: absolute;
    background: red;
    padding: 2px 4px;
    border-radius: 10px;
    line-height: 1;
    color: #fff;
    right: -5px;
    top: -10px;
    z-index: 9;
  }
}
.message-box {
  user-select: none;
  position: absolute;
  top: 70px;
  right: -50px;
  background: #fff;
  z-index: 9;
  width: 300px;
  line-height: 1.2;
  border: 1px solid #eee;
  border-radius: 10px;

  .message-item {
    border-bottom: 1px solid #eee;
    padding: 20px;
    h3 {
      margin-bottom: 10px;
    }
  }
}

.page-view {
  padding: 10px 20px 5px;
  .page-item {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #ccc;
    color: white;
    line-height: 20px;
    text-align: center;
    float: left;
    margin-right: 5px;
    margin-bottom: 5px;
    &.active {
      background-color: #ffbf00;
    }
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>
