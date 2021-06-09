<template>
  <div class="product">
    <Breadcrumb :BreadcrumbList="BreadcrumbList"></Breadcrumb>
    <div class="content_wrap">
      <div class="content">
        <div class="search">
          <div class="search-info">
            <label for="">关键词：</label>
            <el-input v-model="search" placeholder="搜索"></el-input>
          </div>
          <div class="search_button">
            <el-button type="primary">搜索</el-button>
            <el-button type="">清空</el-button>
          </div>
        </div>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="name" label="名称" width="400px">
          </el-table-column>
          <el-table-column
            prop="subtitle"
            label="标题"
            width="300px"
          ></el-table-column>
          <el-table-column label="价格" width="150px">
            <template slot-scope="scope">
              <span>{{ "￥" + scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品状态">
            <template slot-scope="scope">
              <span style="display: inline-flex; width: 50px">{{
                scope.row.status | status
              }}</span>
              <el-button type="" style="margin-left: 10px">{{
                scope.row.status | statusBut
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb.vue";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      BreadcrumbList: ["商品", "商品列表"],
      list: [],
      search: "",
    };
  },
  methods: {
    productList() {
      this.$http("/api/manage/product/list.do", "GET", null, {
        pageSize: 10,
        pageNum: 1,
      }).then((res) => {
        this.list = res.data.list;
        console.log(this.list);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
    .content {
      height: 100%;
      background: #fff;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .search {
        display: flex;
        justify-content: space-between;
        .search-info {
          display: flex;
          align-items: center;
          width: 50%;
          .el-input {
            width: 50%;
          }
        }
      }
      .el-table {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .el-table__body-wrapper {
          flex: 1;
          overflow: auto;
        }
      }
    }
  }
}
</style>
