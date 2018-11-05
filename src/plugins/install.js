import Vue from 'vue'
import LoadingBar from "../components/loading-bar"

import {
    Button,
    Message
} from 'element-ui'

Vue.use(Button)

Vue.prototype.$message = Message
Vue.prototype.$loadingBar = LoadingBar