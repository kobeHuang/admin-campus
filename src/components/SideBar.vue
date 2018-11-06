<template>
  <div class="sidebar">
    <div class="header-l">
      <i class="iconfont icon-weibiaoti12" @click="toggleSideBarVisible"></i>
      <span class="platform-name" :hidden="isCollapse">管理平台</span>
    </div>
    <div class="user-info-wrap" :hidden="isCollapse">
      <img src="../assets/images/touxiang.png" alt="">
      <div class="user-info">
        <div class="user-type">管理员</div>
        <div class="user-name">tresor</div>
      </div>
    </div>
    <el-menu router :default-active="$route.path" background-color="#2A3F54" text-color="#fff" active-text-color="#ffd04b"
     :collapse-transition="false" :collapse="isCollapse" unique-opened>
      <template v-if="!route.hidden" v-for="(route, index) in targetRoute.children">
        <!-- 三级导航 -->
        <el-submenu :index="route.path" :key="index" v-if="route.children" :class="{'isSmall': isCollapse }">
          <template slot="title">
            <i class="iconfont" :class="route.icon"></i><em class="route-name" slot="title" :hidden="isCollapse">{{route.name}}</em>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="r.path" v-for="r in route.children" :key="r.path" v-if="!r.hidden">{{r.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 二级导航 -->
        <el-menu-item :index="route.path" :key="route.path" v-else-if="!route.children" :class="{'isSmall': isCollapse }">
            <i class="iconfont" :class="route.icon"></i><em class="route-name" slot="title">{{route.name}}</em>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
      isCollapse: false
    };
  },
  computed: {
    targetRoute() {
      let targetRoute = this.$router.options.routes.find(route => {
        return route.path === this.$route.matched[0].path;
      });
      return targetRoute;
    },
    sideBarVisible() {
      return this.$store.getters.sideBarVisible;
    }
  },
  methods: {
    toggleSideBarVisible() {
      // this.isCollapse = this.sideBarVisible;
      this.$store.commit("SET_SIDEBARVISIBLE", !this.sideBarVisible);
      if(this.sideBarVisible){
        this.isCollapse = false;
      }else{
        setTimeout(()=>{
          this.isCollapse = true;
        }, 200);
      }
    },
  },
  mounted() {
    this.userInfo =
      JSON.parse(window.sessionStorage.getItem("USER_INFO")) || {};
  }
};
</script>
<style lang='scss' scoped>
.sidebar {
  .header-l {
    .iconfont {
      display: inline-block;
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      font-size: 22px;
      color: #fff;
      cursor: pointer;
      vertical-align: middle;
      &:hover {
        color: rgba(255,255,255,.8);
      }
    }
    .platform-name {
      margin-right: 42px;
      height: 60px;
      line-height: 60px;
      font-size: 22px;
      color: #fff;
      vertical-align: middle;
    }
    .nav-bar{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .user-info-wrap {
    padding: 20px;
    font-size: 0;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .user-info {
      margin-left: 20px;
      display: inline-block;
      vertical-align: middle;
      .user-type {
        font-size: 14px;
        color: #999;
      }
      .user-name {
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .iconfont {
    margin-right: 15px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
    color: #ccc;
  }
  .isSmall{
    .iconfont{
      font-size: 22px;
    }
  }
  .route-name {
    color: #ccc;
  }
  .el-menu-item.is-active {
    border-right: 4px solid #1db096;
    background-color: #34485c !important;
    .iconfont,
    .route-name {
      color: rgb(255, 208, 75) !important;
    }
  }
  .smaller{
    width: 70px;
  }
}
</style>