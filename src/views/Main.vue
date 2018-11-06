<template>
  <div class="container">
    <transition name="move">
      <aside>
        <my-sidebar></my-sidebar>
      </aside>
    </transition>
    <div class="main-view" :style="{left: sideBarVisible ? '230px' : '65px'}">
      <my-header></my-header>
      <section>
        <my-breadcrumb class="breadcrumb"></my-breadcrumb>
        <router-view class="content-view">
        </router-view>
      </section>
    </div>
  </div>
</template>
<script>
import { Header, SideBar, BreadCrumb } from "../components";
export default {
  data() {
    return {};
  },
  computed: {
    sideBarVisible() {
      return this.$store.getters.sideBarVisible;
    }
  },
  components: {
    "my-header": Header,
    "my-sidebar": SideBar,
    "my-breadcrumb": BreadCrumb
  }
};
</script>
<style lang='scss' scoped>
.container {
  position: relative;
  height: 100%;
  aside {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    overflow-y: scroll;
    background-color: #2a3f54;
  }
  .main-view {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 230px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    transition: left 0.3s;
    section {
      display: flex;
      flex-direction: column;
      flex: 1;
      position: relative;
      width: 100%;
      overflow-y: auto;
      transition: left 0.3s;
      background-color: #fff;
      .breadcrumb {
        padding: 20px 20px 10px 20px;
        font-size: 14px;
      }
      .content-view {
        flex: 1;
        padding: 0 20px;
        width: 100%;
        overflow: auto;
      }
    }
  }
}

.move-enter-active,
.move-leave-active {
  transition: transform 0.3s;
}

.move-enter,
.move-leave-to {
  transform: translateX(-160px);
}
.move-enter-to,
.move-leave {
  transform: translateX(0);
}
</style>