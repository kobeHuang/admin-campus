<template>
  <header>
    <div class="header-r">
      <el-dropdown>
        <span class="el-dropdown-link userinfo-box">
          <img src="../assets/images/touxiang.png" alt="">
          <span class="user-name">{{userInfo.trueName}}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>

export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    // 登出
    logout() {
      this.$confirm("是否确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(data => {
        myAxios("post", config.COMMON.logout).then(data => {
          sessionStorage.removeItem("USER_INFO");
          this.$router.push("/login");
        });
      });
    }
  },
  mounted() {
    this.userInfo =
      JSON.parse(window.sessionStorage.getItem("USER_INFO")) || {};
  }
};
</script>
<style lang='scss' scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ededed;
  .header-l {
    flex: 1;
  }
  .header-r {
    position: relative;
    margin-right: 20px;
    .userinfo-box {
      position: relative;
      width: 200px;
      height: 40px;
      line-height: 40px;
      font-size: 0;
      background-color: #fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .user-name {
        margin: 0 10px;
        font-size: 16px;
        color: #333;
        vertical-align: middle;
      }
      i {
        font-size: 20px;
        color: #999;
        vertical-align: middle;
      }
    }
    .drop-down {
      position: absolute;
      z-index: 999;
      left: 0;
      right: 0;
      border: 1px solid #eee;
      .log-out {
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #fff;
      }
    }
  }
}
</style>