<template>
  <div>
    <div class="content-wrap">
      <div class="table-query-bar clean">
        <div class="fl">
          <label for>
            开始/结束日期:
            <DatePicker
              class="wd-150-mr-30"
              type="datetimerange"
              :clearable="false"
              format="yyyy-MM-dd"
              v-model="formCustom.createTime"
              placement="bottom-end"
              placeholder="选择日期"
              :style="{ width: '200px' }"
            />
          </label>
          <!-- <label for>
            出函机构:
            <Select
              v-model="formCustom.tenderCompanyId"
              class="wd-150-mr-30">
              <Option :value="item.companyId" v-for="item in insuranceList">{{item.companyName}}</Option>
            </Select>
          </label> -->
          <label for>
            错误状态:
            <Select
              clearable
              v-model="formCustom.orderStatus"
              class="wd-150-mr-30"
            >
              <Option
                :value="item.value"
                :key="item.value"
                v-for="item in policyStatus"
              >
                {{ item.label }}
              </Option>
            </Select>
          </label>
          <Button type="primary" @click="search()">搜索</Button>
        </div>
        <div class="fr" />
      </div>

      <!-- :loading="tableLoading" -->
      <Table :columns="tableColumns" :data="tableData" border>
        <template slot-scope="{ row }" slot="action">
          <Button
            type="primary"
            size="small"
            @click="detail(row)"
            class="mr-12"
          >
            查看
          </Button>
        </template>
      </Table>
      <div>
        <Page
          class="text-right margin-top-10"
          style="float: right; margin-top: 30px"
          show-sizer
          :page-size-opts="[10, 20, 30, 50, 100]"
          :page-size="pageSize"
          @on-page-size-change="pageSizeChange"
          :total="total"
          @on-change="changePage"
          :current="currentPage"
          show-total
          show-elevator
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPerformace } from "@/api/index";

export default {
  data() {
    return {
      info: {},
      searchName: "",
      isModalShow: false,
      tableLoading: true,
      isModalEditorShow: false,
      policyStatus: [],
      formCustom: {
        orderType: "0",
        createTime: [null, null],
        // tenderCompanyId: null,
        orderStatus: null,
      },
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      emailAccountList: [],
      emailGatewayList: [],
      tableColumns: [
        {
          title: "序号",
          align: "center",
          minWidth: 90,
          render: (r, params) => {
            return <span>{params.index + 1}</span>;
          },
        },
        {
          title: "错误类型",
          key: "type",
          align: "center",
          minWidth: 150,
        },
        {
          title: "连接时间",
          key: "connectTime",
          align: "center",
          minWidth: 130,
        },
        {
          title: "首字节到达时间",
          key: "ttfbTime",
          align: "center",
          minWidth: 160,
        },
        {
          title: "响应的读取时间",
          key: "responseTime",
          align: "center",
          minWidth: 150,
        },
        {
          title: "DOM解析的时间",
          key: "parseDOMTime",
          align: "center",
          minWidth: 160,
        },
        {
          title: "DOM加载的时间",
          key: "domContentLoadedTime",
          align: "center",
          minWidth: 160,
        },
        {
          title: "首次可交互时间",
          key: "timeToInteractive",
          align: "center",
          minWidth: 100,
        },
        {
          title: "完整的加载时间",
          key: "loadTime",
          align: "center",
          minWidth: 100,
        },
        {
          title: "FP",
          key: "firstPaint",
          align: "center",
          minWidth: 100,
        },
        {
          title: "FCP",
          key: "firstContentfulPaint",
          align: "center",
          minWidth: 100,
        },
        {
          title: "FMP",
          key: "firstMeaningfulPaint",
          align: "center",
          minWidth: 100,
        },
        {
          title: "LCP",
          key: "largestContentfulPaint",
          align: "center",
          minWidth: 100,
        },
        {
          title: "延时时间",
          key: "inputDelay",
          align: "center",
          minWidth: 100,
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "center",
          minWidth: 100,
        },
        {
          title: "处理时间",
          key: "duration",
          align: "center",
          minWidth: 100,
        },
        {
          title: "操作",
          slot: "action",
          width: 300,
          fixed: "right",
        },
      ],
      insuranceList: [],
      isShowmodal: false,
    };
  },
  components: {},
  created() {
    this.getList();
    // getInsuranceList().then(res => {
    //   if (res.code === 200) {
    //     this.insuranceList = res.data;
    //   } else {
    //     this.$Message.error({ content: res.message });
    //   }
    // });
  },
  computed: {
    ...mapState(["dist", "recodeTypeList"]),
  },
  mounted() {
    this.getList();
    setTimeout(() => console.log(this.recodeTypeList), 2000);
  },
  methods: {
    search() {
      this.getList();
    },
    async getList() {
      const res = await getPerformace();

      console.log(res);
      if (res.code === 200) {
        this.tableData = res.data;
      }
    },
    changePage(inx) {
      this.currentPage = inx;
      this.getList();
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.getList();
    },
    cancel() {},
    enter() {
      this.isShowmodal = false;
      this.getList();
    },
  },
};
</script>
<style lang="less" scoped>
.wd-150-mr-30 {
  width: 150px;
  margin-right: 30px;
}
.mr-12 {
  margin-right: 8px;
}
.table-query-bar {
  padding: 10px 15px;
  margin-bottom: 25px;
}

.table-query-content {
}

.table-content-wrap {
  position: relative;
  border: 1px solid #dcdee2;
  border-bottom: 0;
  border-right: 0;
  & > .table-wrap {
    width: inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: #515a6e;
    font-size: 12px;
    background-color: #fff;
    box-sizing: border-box;
    &:after {
      width: 1px;
      height: 100%;
      top: 0;
      right: 0;
      z-index: 3;
      content: "";
      position: absolute;
      background-color: #dcdee2;
    }
    & > .table-header {
      overflow: hidden;
    }
    & > .table-body-wrap tr:nth-child(2n) {
      background-color: #f8f8f9;
      transition: background-color 0.2s ease-in-out;
    }
    & > .table-body-wrap tr:hover {
      background-color: #ebf7ff;
    }
    table {
      table-layout: fixed;
      width: 100%;
      th {
        min-width: 0;
        height: 40px;
        white-space: nowrap;
        overflow: hidden;
        background-color: #f8f8f9;
        box-sizing: border-box;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #e8eaec;
      }
      td {
        min-width: 0;
        height: 48px;
        box-sizing: border-box;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #e8eaec;
      }
      .table-cell {
        display: inline-block;
        word-wrap: normal;
        vertical-align: middle;
        padding-left: 18px;
        padding-right: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        box-sizing: border-box;
      }
    }
  }
}

.modal-form-wrap {
  padding: 0 50px;
  padding-right: 70px;
}

.form-wrap {
  display: flex;
  padding-right: 25px;
  .form-l-wrap,
  .form-r-wrap {
    flex: 1;
  }
}
</style>
