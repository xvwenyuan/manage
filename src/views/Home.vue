<template>
  <div class="home">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" alt />
        <div class="text">可期团购微信小程序后台管理系统</div>
        <el-dropdown @command="handleCommand">
          <div class="box">
            <img src="../assets/user.png" alt style="width:40px;height:40px" />
            <div class="username">{{username}}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            router
            :default-active="$route.path"
          >
            <el-menu-item index="/home/goodslist">
              <i class="el-icon-goods"></i>
              <span slot="title">普通商品</span>
            </el-menu-item>
            <el-menu-item index="/home/grouplist">
              <i class="el-icon-s-goods"></i>
              <span slot="title">团购商品</span>
            </el-menu-item>
            <el-menu-item index="/home/groupsetting">
              <i class="el-icon-setting"></i>
              <span slot="title">开团设置</span>
            </el-menu-item>
          </el-menu>
          <div class="button" @click="changeCollapse">
            <span class="iconfont" v-if="isCollapse">&#xe610;</span>
            <span class="iconfont" v-else>&#xe663;</span>
          </div>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleCommand() {
      this.$cookies.remove("token");
      this.$cookies.remove("username");
      this.$cookies.remove("root");
      this.$router.push("/login");
    }
  },
  computed: {
    ltgt() {
      if (this.isCollapse) {
        return ">";
      } else {
        return "<";
      }
    },
    username() {
      return this.$cookies.get("username");
    }
  }
};
</script>

<style lang="scss" scoped>
$color: #001529;
.home {
  height: 100%;
  width: 100%;
  .el-container.is-vertical {
    height: 100%;
    width: 100%;
    .el-header {
      background-color: #fff;
      width: 100%;
      padding-left: 0;
      height: 60px;
      img {
        width: 40px;
        height: 40px;
        margin: 10px 20px;
        border-radius: 20px;
        float: left;
      }
      div.text {
        font-size: 24px;
        height: 60px;
        line-height: 60px;
        color: #000;
        float: left;
        margin-left: 4px;
      }
      .el-dropdown {
        float: right;
        .box {
          background-color: #fff;
          text-align: center;
          height: 60px;
          img {
            width: 40px;
            height: 40px;
            margin: 10px 0;
          }
          .username {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            color: #999;
            margin: 10px 0 10px 10px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .el-container {
      height: calc(100% - 60px);
      width: 100%;
      .el-aside {
        transition: width 0.1s ease-in-out;
        height: 100%;
        position: relative;
        background-color: $color;
      }
      .el-menu {
        border-right: none;
      }
      .el-main {
        background-color: #eaedf1;
        height: 100%;
        width: 100%;
      }
    }
  }
}
.button {
  width: 100%;
  height: 56px;
  position: absolute;
  bottom: 0;
  // border-top: 1px solid #333;
  // border-bottom: 1px solid #333;
  background-color: #02213f;
  color: #fff;
  text-align: right;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  span {
    display: inline-block;
    height: 56px;
    text-align: center;
    width: 100%;
    line-height: 56px;
  }
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown :hover {
  background-color: rgba(0, 0, 0, 0.025);
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>