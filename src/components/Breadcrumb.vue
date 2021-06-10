<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in BreadcrumbList.bread"
        :key="index"
        >{{ item }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <h2>{{BreadcrumbList.title}}</h2>
  </div>
</template>

<script>
export default {
  props: ["BreadcrumbList","title"],
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #fff;
  padding: 20px 0 10px 30px;
  box-sizing: border-box;
  h2 {
    font-size: 25px;
    padding: 15px 0;
  }
}
</style>
