<template>
  <div class="product">
    <Breadcrumb :BreadcrumbList="BreadcrumbList"></Breadcrumb>
    <div class="content_wrap">
      <div class="content">
        <div class="search">
          <div>
            <div class="search-info">
              <label for="">关键词：</label>
              <el-input v-model="search" placeholder="搜索"></el-input>
            </div>
            <div class="search_button">
              <el-button type="primary">搜索</el-button>
              <el-button type="">清空</el-button>
            </div>
          </div>
          <el-button type="primary">新增</el-button>
        </div>
        <el-table :data="list.list" style="width: 100%">
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column
            prop="subtitle"
            label="标题"
            width="300px"
          ></el-table-column>
          <el-table-column label="价格">
            <template slot-scope="scope">
              <span>{{ "￥" + scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品状态">
            <template slot-scope="scope">
              <span style="display: inline-flex; width: 50px">{{
                scope.row.status | status
              }}</span>
              <el-button
                type=""
                @click.native="putaway(scope.row.id)"
                style="margin-left: 10px"
                >{{ scope.row.status | statusBut }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="particulars(scope.row.id)"
                >查看详情</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="compileShop(scope.row.id)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="params.pageNum"
          layout="prev, pager, next"
          background
          :total="list.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
const qs = require("qs");
import Breadcrumb from "../components/Breadcrumb.vue";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      BreadcrumbList: { bread: ["商品", "商品列表"], title: "商品列表" },
      list: [],
      search: "",
      params: {
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  methods: {
    productList() {
      this.$http("/api/manage/product/list.do", "GET", null, this.params).then(
        (res) => {
          this.list = res.data;
        }
      );
    },
    particulars(id) {
      this.$router.push({ name: "Detail", query: { id } });
    },
    compileShop(id) {
      this.$router.push({ name: "Editor", query: { id } });
    },
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.productList();
    },
    putaway(val) {
      this.$http(
        "/api/manage/product/set_sale_status.do",
        "POST",
        qs.stringify({
          productId: val.id,
          status: val.status,
        })
      ).then((res) => {
        this.$message({
          type: "success",
          message: res.data,
        });
        this.productList();
      });
    },
  },
  filters: {
    status(val) {
      if (val === 1) {
        return "在售";
      } else {
        return "已下架";
      }
    },
    statusBut(val) {
      if (val === 1) {
        return "设置下架";
      } else {
        return "设置上架";
      }
    },
  },
  mounted() {
    this.productList();
  },
};
</script>

<style scoped lang="scss">
.product {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content_wrap {
    padding: 20px;
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;
    position: relative;
    .content {
      height: 100%;
      background: #fff;
      padding: 40px 40px 60px 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .search {
        > div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          .search-info {
            display: flex;
            align-items: center;
            width: 50%;
            .el-input {
              width: 50%;
            }
          }
        }
      }
      .el-table {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        ::v-deep .el-table__body-wrapper {
          flex: 1;
          overflow: auto;
        }
      }
      .el-pagination {
        position: absolute;
        bottom: 30px;
        right: 50px;
      }
    }
  }
}
</style>
