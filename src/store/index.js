/*
 *  状态管理器
 *  以每个功能页面为一个module，module提供的方法为可复用性（common 除外）
 */
import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import createLogger from 'vuex/dist/logger';


const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    common
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store