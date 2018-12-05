import { 
    axiosMenu, 
    axiosMenuSave,
    axiosMenuDel
} from '../../api';

//列表基础初始化
const initList = {
    pageno: 1,
    state: {
        // table数据
        [`MENU_TABLELISTS`]: new Array(),

        // 数据总数
        [`MENU_LISTCOUNT`]: 0,

        // 数据每页数量
        [`MENU_PAGESIZE`]: 10,

        // 数据当前页码
        [`MENU_PAGECURRENT`]: 1
    },
    getters: {

        // 获取table数据
        [`MENU_TABLELIST`]: state => state[`MENU_TABLELISTS`],

        // 获取数据总数
        [`MENU_LISTCOUNT`]: state => state[`MENU_LISTCOUNT`],

        // 获取每页数量
        [`MENU_PAGESIZE`]: state => state[`MENU_PAGESIZE`],

        // 获取当前页码
        [`MENU_PAGECURRENT`]: state => state[`MENU_PAGECURRENT`]

    },
    mutations: {

        // 设置table数据
        [`SET_MENU_TABLELIST`](state, { items }) {
            state[`MENU_TABLELISTS`] = items;
        },

        // 设置数据总数
        [`SET_MENU_LISTCOUNT`](state, count) {
            state[`MENU_LISTCOUNT`] = count;
        },

        // 设置当前页码
        [`SET_MENU_PAGECURRENT`](state, count) {
            state[`MENU_PAGECURRENT`] = count;
        },
    },
    actions: {
        /* 
         *  请求获取列表数据
         *  cb  为获取数据后的回调函数
         */ 
        [`GET_MENU_TABLELIST`]({ dispatch, commit, state }, cb) {
            commit(`SET_MENU_TABLELIST`, {items: []});

            let _params = {
                pageNo: initList.pageno,
                pageSize: state[`MENU_PAGESIZE`],
            };

            axiosMenu(_params)
            .then( data => {
                commit(`SET_MENU_TABLELIST`, {items: data.items});
                commit(`SET_MENU_LISTCOUNT`, data.count);
                cb && cb(true);
            }).catch( e => {
                cb && cb(false);
            });
        },

        /*
         *  页码切换调用
         */
        [`CHANGE_MENU_TABLELIST`]({ dispatch, commit, state }, num) {
            initList.pageno = num;
            commit(`SET_MENU_PAGECURRENT`, num);
            dispatch(`GET_MENU_TABLELIST`);
        }
    }
}


/*
 *  增删改
 *  type -- 值为 list 时更新列表数据
 */
const initListHandler = {
    //避免重复提交
    editStatus: 'waitting',
    state: {
        // 编辑加载状态
        [`MENU_EDITSTATUS`]: 'waitting',
    },
    getters: {
        // 获取编辑加载状态
        [`MENU_EDITSTATUS`]: state => state[`MENU_EDITSTATUS`],
    },
    mutations: {
        // 设置编辑加载状态
        [`SET_MENU_EDITSTATUS`](state, status) {
            state[`MENU_EDITSTATUS`] = status;
        },
    },
    actions: {
        //  新增/修改
        [`EDIT_MENU_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            //避免重复提交
            if(initListHandler.editStatus == 'loading'){
                return;
            }
            initListHandler.editStatus = 'loading';
            setTimeout(() => {
                commit(`SET_MENU_EDITSTATUS`, 'loading');
                axiosMenuSave(params)
                .then( data => {
                    cb && cb(data);
                    setTimeout(() => {
                        initListHandler.editStatus = 'success';
                    }, 400);
                    commit(`SET_MENU_EDITSTATUS`, 'success');
                    type == 'list' && (
                        dispatch(`GET_MENU_TABLELIST`)
                    );
                }).catch( e => {
                    setTimeout(() => {
                        initListHandler.editStatus = 'failure';
                    }, 400);
                    commit(`SET_MENU_EDITSTATUS`, 'failure');
                });
            }, 250);
        },
        //  删除
        [`DEL_MENU_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            axiosMenuDel(params)
            .then( data => {
                type == 'list' && (
                    dispatch(`GET_MENU_TABLELIST`)
                );
                cb && cb();
            })
        },
    }
}


const state = Object.assign({}, initList.state, initListHandler.state);

const getters = Object.assign({}, initList.getters, initListHandler.getters);

const mutations = Object.assign({}, initList.mutations, initListHandler.mutations);

const actions = Object.assign({}, initList.actions, initListHandler.actions);


export default {
    state,
    getters,
    mutations,
    actions
}