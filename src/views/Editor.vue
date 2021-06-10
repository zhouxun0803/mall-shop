<template>
  <div class="detail">
    <Breadcrumb :BreadcrumbList="BreadcrumbList"></Breadcrumb>
    <div class="content_wrap">
      <div class="content">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-dynamic"
          :rules="rules"
        >
          <el-form-item prop="name" label="商品名称">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="subtitle" label="商品描述">
            <el-input v-model="ruleForm.subtitle"></el-input>
          </el-form-item>
          <el-form-item label="商品一级分类" prop="name">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item>
        </el-form>
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
        bread: ["商品", "商品列表", "修改商品"],
        title: "修改商品",
      },
      ruleForm: {
        name: "",
        subtitle: "",
      },
      rules: {
        name: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        subtitle: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  methods: {
    editorList() {
      this.$http("/api/manage/product/detail.do", "GET", null, {
        productId: this.$route.query.id,
      }).then((res) => {
        this.ruleForm = res.data;
      });
    },
    submitForm() {},
  },
  mounted() {
    this.editorList();
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
      ::v-deep .el-form-item {
        display: flex;
        justify-content: center;
        .el-form-item__label {
          width: 150px !important;
        }
        .el-form-item__content {
          margin-left: 10px !important;
          width: 50%;
        }
      }
    }
  }
}
</style>
