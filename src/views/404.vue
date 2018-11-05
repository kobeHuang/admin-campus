<template>
  <div class="error-page">
    <img src="../assets/images/error.png" alt="">
    <p class="error-tips">很抱歉，您访问的页面不存在......</p>
    <div class="btn-list">
      <el-button type="primary" @click="gotoHomePage">返回首页</el-button>
      <el-button type="primary" @click="reload">重新加载</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotoHomePage() {
      this.$router.push("/");
    },
    reload() {
      location.reload();
    }
  }
};
</script>
<style lang='scss' scoped>
.error-page {
  text-align: center;
  img {
    margin-top: 100px;
    &:hover{
      animation: rocketRise 1.5s ease-in forwards;
    }
  }
  .error-tips {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }
  .btn-list {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .el-button {
      &:last-of-type{
        margin-left: 50px;
      }
    }
  }
}

@keyframes rocketRise {
  0% {
    transform: translateY(0%);
  }
  20% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(-200%);
  }
}
</style>