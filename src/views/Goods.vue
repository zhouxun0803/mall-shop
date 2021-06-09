<template>
  <div class="goods container">
    <h2>首页</h2>
    <ul v-if="list" class="row">
      <li>
        <router-link to="user">
          <p class="count">{{ list.orderCount }}</p>
          <p class="desc">用户总数</p>
        </router-link>
      </li>
      <li>
        <router-link to="product">
          <p class="count">{{ list.productCount }}</p>
          <p class="desc">商品总数</p>
        </router-link>
      </li>
      <li>
        <router-link to="order">
          <p class="count">{{ list.userCount }}</p>
          <p class="desc">订单总数</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: "",
    };
  },
  methods: {
    data() {
      this.$http("/api/manage/statistic/base_count.do", "GET").then((res) => {
        this.list = res.data;
      });
    },
  },
  mounted() {
    this.data();
  },
};
</script>

<style scoped lang="scss">
.goods {
  width: 100%;
  h2 {
    font-weight: 500;
    background: #fff;
    font-size: 25px;
    padding: 20px 0 10px 30px;
    box-sizing: border-box;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 20px;
    box-sizing: border-box;
    li {
      width: 30%;
      &:first-child a {
        background-color: #f0ad4e;
      }
      &:nth-of-type(2) a {
        background-color: #5cb85c;
      }
      &:last-child a {
        background-color: #4cb1cf;
      }
      a {
        width: 100%;
        height: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        transition: transform 0.2s;
        .count {
          font-size: 50px;
        }
        .desc {
          font-size: 18px;
          margin-top: 5px;
        }
        &:hover {
          transform: scale(1.1);
          color: #333;
        }
      }
    }
  }
}
</style>
