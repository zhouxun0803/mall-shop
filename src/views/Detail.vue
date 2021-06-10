<template>
  <div class="detail">
    <Breadcrumb :BreadcrumbList="BreadcrumbList"></Breadcrumb>
    <div class="content_wrap">
      <div class="content">
        <div class="content_top">
          <h3>商品基本信息</h3>
          <ul>
            <li>名称：{{ list.name }}</li>
            <li>标题：{{ list.subtitle }}</li>
            <li>商品分类：{{ list.categoryId }}</li>
            <li>价格：￥{{ list.price }}</li>
            <li>上架状态：{{ list.status }}</li>
            <li>库存：{{ list.stock }}</li>
          </ul>
        </div>
        <div class="content_bottom">
          <h3>商品基本信息</h3>
          <div v-html="list.detail"></div>
        </div>
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
      BreadcrumbList: {
        bread: ["商品", "商品列表", "商品详情"],
        title: "商品详情",
      },
      list: [],
    };
  },
  methods: {
    detailList() {
      this.$http("/api/manage/product/detail.do", "GET", null, {
        productId: this.$route.query.id,
      }).then((res) => {
        this.list = res.data;
      });
    },
  },
  mounted() {
    this.detailList();
  },
};
</script>

<style scoped lang="scss">
.detail {
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
      h3 {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 15px;
      }
      .content_top {
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 20px;
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          justify-content: space-between;
          li {
            width: 30%;
            margin-bottom: 15px;
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
          }
        }
      }
      .content_bottom {
        width: 100%;
        margin-top: 20px;
        div {
          display: flex;
          justify-content: center;
          color: rgba(0, 0, 0, 0.85);
          font-size: 14px;
        }
      }
    }
  }
}
</style>
