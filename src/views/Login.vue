<template>
  <div class="login">
    <div class="content">
      <div class="header">
        <img class="logo" src="../assets/images/logo.png" alt="" />
        <h2>Admin</h2>
      </div>
      <el-form class="from" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="" prop="username">
          <el-input
            type="username"
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">30天内自动登录</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFrom()">登入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const qs = require("qs");
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    loginFrom() {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          this.$http(
            "api/manage/user/login.do",
            "POST",
            qs.stringify(this.ruleForm)
          ).then((res) => {
            if (res.status != 0) {
              this.$message({
                message: res.msg,
                type: "error",
              });
            } else {
              this.$router.push({
                name: "Home",
              });
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.$store.commit("login", res.data.username);
            }
          });
        })
        .catch((err) => {});
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        document.title = "登录页面";
      },
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: #000;
  background-image: url("../assets/images/login_bj.svg");
  background-position: center center;
  background-size: 100%;
  overflow: hidden;
  color: #fff;
  .content {
    width: 320px;
    margin: 0 auto;
    margin-top: 160px;
    .header {
      width: 100%;
      margin: 15px 0 20px 0;
      display: flex;
      align-items: center;
      .logo {
        width: 60px;
        margin-left: 20px;
      }
      h2 {
        font-size: 30px;
        font-weight: 500;
        color: #5fb878;
        margin-left: 20px;
      }
    }
    .from {
      width: 100%;
      ::v-deep .el-form-item {
        padding-bottom: 10px;
        .el-form-item__content {
          position: relative;
          .el-form-item__error {
            font-size: 12px;
            color: #5fb878;
            padding: 3px 0;
            position: absolute;
            bottom: -20px;
            left: 5px;
          }
          .el-input__inner {
            height: 44px;
            width: 100%;
            box-sizing: border-box;
            border-radius: 5px;
            padding: 0 15px;
            box-sizing: border-box;
            &:focus {
              border-color: #5fb878;
              outline: none;
              box-shadow: 0px 0px 2px 1px #5fb878 !important;
            }
          }
        }
      }

      ::v-deep .el-checkbox {
        display: inline-flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        .el-checkbox__original {
          width: 18px;
          height: 18px;
        }
        .el-checkbox__label {
          color: #fff;
          margin-left: 8px;
        }
      }
      ::v-deep .el-button {
        width: 100%;
        height: 44px;
        background: #5fb878;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        border: none;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background: #7dc491;
        }
      }
    }
  }
}
</style>
