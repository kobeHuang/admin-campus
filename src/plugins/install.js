import Vue from 'vue'
import LoadingBar from "../components/loading-bar"

import {
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Dialog,
    Form,
    FormItem,
    Menu,
    Input,
    Submenu,
    Select,
    Switch,
    Option,
    MenuItem,
    MenuItemGroup,
    Message,
    Loading,
    Table,
    TableColumn,
    Pagination,
    Upload
} from 'element-ui'

Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Submenu);
Vue.use(Select);
Vue.use(Switch);
Vue.use(Option);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Upload);

Vue.prototype.$message = Message
Vue.prototype.$loadingBar = LoadingBar