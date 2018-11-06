<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(route, index) in $route.matched" :key="index">{{route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='scss' scoped>
</style>