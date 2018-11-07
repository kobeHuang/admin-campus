import Vue from 'vue'
import LoadingBar from "../components/loading-bar"

import {
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Message,
    Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Loading)

Vue.prototype.$message = Message
Vue.prototype.$loadingBar = LoadingBar