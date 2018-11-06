<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica,
    "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
