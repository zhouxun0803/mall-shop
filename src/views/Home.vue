<template>
  <div class="home" id="home">
    <el-container>
      <el-aside style="width: ''" :style="{ background: $store.state.theme }">
        <div class="header">
          <img v-if="isCollapse" src="../assets/images/logo.png" alt="" />
          <span v-else>后台管理系统</span>
        </div>
        <input
          class="ipt"
          type="checkbox"
          v-model="isCollapse"
          :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
        />
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          text-color="hsla(0,0%,100%,.65)"
          :background-color="$store.state.theme"
          active-text-color="#fff"
          :default-active="activeIndex"
          router
          unique-opened
        >
          <el-submenu
            :index="'' + item.id"
            v-for="item in sidebar"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon" aria-hidden="true"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'' + item.name">{{
                item.con
              }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="height: ''">
          <div class="header_top">
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="getFullCreeen"
            >
            </el-switch>
            <el-dropdown>
              <div>
                <img class="el-icon-setting" src="../assets/images/photo.png" />
                <span>{{ $store.state.username }}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="quit"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <div class="huanfu" @click="dialog = true">
              <img src="../assets/images/huanfu.jpg" alt="" />
            </div>
          </div>
          <div class="header_bottom">
            <i class="el-icon-arrow-left" @click="marginLeft"></i>
            <ul class="header_bottom_list" ref="listMove">
              <li
                @click="routeClick(item.name)"
                v-for="(item, index) in routeList"
                :key="index"
              >
                <em :class="{ select: $route.name === item.name }"></em
                >{{ item.con }}<b @click.stop="handleClose(item.name)">x</b>
              </li>
            </ul>
            <div class="header_bottom_right">
              <i class="el-icon-arrow-right" @click="marginRight"></i>
              <el-dropdown>
                <i class="el-icon-arrow-down"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="togglePresent"
                    >关闭当前</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="toggleOther"
                    >关闭其它</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="toggleAll"
                    >关闭全部</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-drawer :visible.sync="dialog" :withHeader="false">
      <div class="stylize">
        <span>整体风格</span>
        <ul>
          <li
            @click="stylizeClick(index)"
            v-for="(item, index) in 2"
            :key="index"
          >
            <em :class="{ selectStylizes: stylizeIndex === index }"></em>
            <b :class="{ selectStylize: stylizeIndex === index }"></b>
          </li>
        </ul>
        <div class="theme">
          <span>主题配色</span>
          <div>
            <Theme></Theme>
          </div>
        </div>
      </div>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">关闭</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import screenfull from "screenfull";
import Theme from "../components/theme.vue";

export default {
  components: {
    Theme,
  },
  data() {
    return {
      isCollapse: false,
      value: false,
      sidebar: [
        {
          id: 1,
          icon: "el-icon-stopwatch",
          title: "仪表盘",
          con: "首页",
          name: "goods",
        },
        {
          id: 2,
          icon: "el-icon-pie-chart",
          title: "商品",
          con: "商品管理",
          name: "product",
        },
        {
          id: 3,
          icon: "el-icon-notebook-2",
          title: "品类",
          con: "品类管理",
          name: "category",
        },
        {
          id: 4,
          icon: "el-icon-shopping-bag-2",
          title: "订单",
          con: "订单管理",
          name: "order",
        },
        {
          id: 5,
          icon: "el-icon-user-solid",
          title: "用户",
          con: "用户管理",
          name: "user",
        },
      ],
      activeIndex: "",
      dialog: false,
      routeList: JSON.parse(localStorage.getItem("routeList")) || [],
      themeColor: ["#1e9fff", "#5fb878", "#ff5722", "#ffb800", "#a9a9a9"],
      stylizeIndex: 0,
      themeIndex: 0,
    };
  },
  methods: {
    quit() {
      localStorage.clear();
      this.$router.replace({
        name: "Login",
      });
    },
    getFullCreeen() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
    },
    cancelForm() {
      this.dialog = false;
    },
    marginLeft() {
      this.$refs.listMove.scrollLeft -= 500;
    },
    marginRight() {
      this.$refs.listMove.scrollLeft += 500;
    },
    routeClick(name) {
      this.$router.push({ name });
    },
    handleClose(name) {
      this.routeList = this.routeList.filter((item) => item.name != name);
      this.activeIndex = this.routeList.slice(-1)[0].name;
      this.$router.push(this.routeList.slice(-1)[0].name);
      localStorage.setItem("routeList", JSON.stringify(this.routeList));
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.con) && res.set(arr.con, 1));
    },
    togglePresent() {
      this.routeList = this.routeList.filter(
        (item) => item.name != this.$route.name
      );
      this.activeIndex = this.routeList.slice(-1)[0].name;
      this.$router.push(this.routeList.slice(-1)[0].name);
      localStorage.setItem("routeList", JSON.stringify(this.routeList));
    },
    toggleOther() {
      this.routeList = this.routeList.filter(
        (item) => item.name == this.$route.name
      );
      console.log(this.$route.name);
      if (this.$route.name != "Goods") {
        this.routeList.unshift({ name: "Goods", con: "首页" });
      }
      localStorage.setItem("routeList", JSON.stringify(this.routeList));
    },
    toggleAll() {
      this.routeList = [];
      this.routeList.unshift({ name: "Goods", con: "首页" });
      this.activeIndex = "goods";
      this.$router.push("goods");
      localStorage.setItem("routeList", JSON.stringify(this.routeList));
    },
    stylizeClick(index) {
      this.stylizeIndex = index;
    },
    themeClick(index) {
      this.themeIndex = index;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        if (val.name == "Goods") {
          document.title = "首页";
          this.routeList.push({ name: val.name, con: "首页" });
        } else if (val.name == "Product") {
          document.title = "商品列表";
          this.routeList.push({ name: val.name, con: "商品列表" });
        } else if (val.name == "Category") {
          document.title = "品类列表";
          this.routeList.push({ name: val.name, con: "品类列表" });
        } else if (val.name == "Order") {
          document.title = "订单列表";
          this.routeList.push({ name: val.name, con: "订单列表" });
        } else if (val.name == "User") {
          document.title = "用户列表";
          this.routeList.push({ name: val.name, con: "用户列表" });
        }

        let arr1 = this.unique(this.routeList);
        this.routeList = arr1;

        localStorage.setItem("routeList", JSON.stringify(this.routeList));

        if (val.name === "Goods") {
          this.activeIndex = "goods";
        } else {
          this.activeIndex = val.name.toLowerCase();
        }
      },
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.home {
  height: 100vh;
  .el-header {
    background-color: #fff;
    color: #333;
    padding: 0;
    .header_top {
      line-height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      .el-switch {
        margin-right: 15px;
      }
      .el-dropdown-selfdefine {
        display: flex;
        align-items: center;
        cursor: pointer;
        .el-icon-setting {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 15px;
        }
      }
      .huanfu {
        width: 25px;
        display: inline-flex;
        margin-left: 15px;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
    }
    .header_bottom {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid whitesmoke;
      i {
        display: inline-flex;
        width: 40px;
        height: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .header_bottom_right {
        height: 100%;
        .el-dropdown {
          height: 100%;
          i {
            border-left: 1px solid whitesmoke;
          }
        }
      }
      .header_bottom_list {
        height: 100%;
        display: flex;
        flex: 1;
        border-right: 1px solid whitesmoke;
        border-left: 1px solid whitesmoke;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        li {
          height: 100%;
          border-right: 1px solid whitesmoke;
          padding: 0 15px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          cursor: pointer;
          white-space: nowrap;
          &:first-child b {
            display: none;
          }
          em {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: lightgray;
            margin-right: 12px;
            &.select {
              background: #1e9fff;
            }
          }
          b {
            width: 10px;
            height: 100%;
            display: inline-flex;
            text-align: center;
            align-items: center;
            color: #c2c2c2;
            margin-left: 8px;
            &:hover {
              color: gray;
            }
          }
        }
      }
    }
  }

  .el-aside {
    color: #333;
    height: 100vh;
    position: relative;
    background: #28333e;
    .ipt {
      font-size: 25px;
      background-color: none;
      border: none;
      -webkit-appearance: none; /*去除默认样式*/
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      -ms-appearance: none;
      position: absolute;
      top: 13px;
      right: -50px;
      cursor: pointer;
      z-index: 99;
    }
    .header {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      min-width: 200px;
    }
    ::v-deep .el-submenu:hover {
      color: #fff;
    }
    ::v-deep .el-menu {
      border: none;
      // margin-top: 50px;
    }
  }
  .el-main {
    padding: 0;
    box-shadow: 0 0 2px 2px #f2f2f2;
  }
  ::v-deep .el-drawer {
    padding: 20px;
    box-sizing: border-box;
  }
  ::v-deep .el-drawer__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .stylize {
      > span {
        margin-bottom: 4px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        padding-left: 10px;
        box-sizing: border-box;
        font-weight: 600;
      }
      ul {
        width: 100%;
        display: flex;
        padding-top: 15px;
        padding-left: 5px;
        box-sizing: border-box;
        li {
          width: 70px;
          height: 50px;
          background: #f2f2f2;
          margin-bottom: 20px;
          position: relative;
          border: 2px solid #f2f2f2;
          cursor: pointer;
          b {
            border: 3px solid #a9a9a9;
            width: 80px;
            height: 60px;
            position: absolute;
            top: -7px;
            left: -7px;
            display: none;
            &.selectStylize {
              display: inline-block;
            }
          }
          em {
            display: inline-flex;
            width: 0;
            height: 0;
            position: absolute;
            top: 35px;
            left: 25px;
            transition: all 0.3s;
            border-radius: 4px;
          }
          &:hover em {
            border: 3px solid #a9a9a9;
            width: 80px;
            height: 60px;
            top: -7px;
            left: -7px;
          }
          &:hover .selectStylizes {
            display: none;
          }
          &::after {
            content: "";
            display: inline-flex;
            width: 100%;
            height: 15px;
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
          }
          &::before {
            content: "";
            display: inline-flex;
            width: 15px;
            height: 100%;
            background: #28333e;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 33;
          }
          &:last-child {
            margin-left: 20px;
            &::before {
              content: "";
              display: inline-flex;
              width: 15px;
              height: 100%;
              background: #fff;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 33;
            }
          }
        }
      }
      .theme {
        > span {
          font-size: 14px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.85);
          padding-left: 10px;
          box-sizing: border-box;
        }
        div {
          margin-top: 3px;
          > span {
            width: 30px;
            height: 30px;
            display: inline-flex;
            margin-left: 20px;
            cursor: pointer;
            justify-content: center;
            line-height: 30px;
            color: #fff;
            border-radius: 3px;
            position: relative;
            i {
              display: none;
              position: absolute;
              &.selectTheme {
                display: inline-flex;
              }
            }
            &:first-child {
              margin: 0;
            }
          }
        }
      }
    }
  }
}
::v-deep .el-menu-item-group__title {
  padding: 0;
}
.el-aside {
  overflow: visible;
}
::v-deep .el-container {
  height: 100vh;
  overflow: hidden;
}
</style>
