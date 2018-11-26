import { 
    axiosInfos, 
    axiosInfoSave, 
    axiosInfoDel
} from '../../api';

//列表基础初始化
const initList = {
    pageno: 1,
    state: {

        // table数据
        [`INFOLIST_TABLELISTS`]: new Array(),

        // 数据总数
        [`INFOLIST_LISTCOUNT`]: 0,

        // 数据每页数量
        [`INFOLIST_PAGESIZE`]: 10,

        // 数据当前页码
        [`INFOLIST_PAGECURRENT`]: 1
    },
    getters: {

        // 获取table数据
        [`INFOLIST_TABLELIST`]: state => state[`INFOLIST_TABLELISTS`],

        // 获取数据总数
        [`INFOLIST_LISTCOUNT`]: state => state[`INFOLIST_LISTCOUNT`],

        // 获取每页数量
        [`INFOLIST_PAGESIZE`]: state => state[`INFOLIST_PAGESIZE`],

        // 获取当前页码
        [`INFOLIST_PAGECURRENT`]: state => state[`INFOLIST_PAGECURRENT`]
    },
    mutations: {

        // 设置table数据
        [`SET_INFOLIST_TABLELIST`](state, { items }) {
            state[`INFOLIST_TABLELISTS`] = items;
        },

        // 设置数据总数
        [`SET_INFOLIST_LISTCOUNT`](state, count) {
            state[`INFOLIST_LISTCOUNT`] = count;
        },

        // 设置当前页码
        [`SET_INFOLIST_PAGECURRENT`](state, count) {
            state[`INFOLIST_PAGECURRENT`] = count;
        },
    },
    actions: {
        /* 
         *  请求获取列表数据
         *  页码，size，keyword会被默认传入
         *  cb  为获取数据后的回调函数
         */ 
        [`GET_INFOLIST_TABLELIST`]({ dispatch, commit, state }, cb) {
            commit(`SET_INFOLIST_TABLELIST`, {items: []});

            let _params = {
                pageNo: initList.pageno,
                pageSize: state[`INFOLIST_PAGESIZE`],
            };
            
            initSearch && (
                _params = Object.assign({}, _params, initSearch.params)
            );

            axiosINFOLISTs(_params)
            .then( data => {
                commit(`SET_INFOLIST_TABLELIST`, {items: data.items});
                commit(`SET_INFOLIST_LISTCOUNT`, data.count);
                cb && cb(true);
            }).catch( e => {
                cb && cb(false);
            });
        },

        /*
         *  页码切换调用
         */
        [`CHANGE_INFOLIST_TABLELIST`]({ dispatch, commit, state }, num) {
            initList.pageno = num;
            commit(`SET_INFOLIST_PAGECURRENT`, num);
            dispatch(`GET_INFOLIST_TABLELIST`);
        }
    }
}

/* 
 *  列表搜索相关
 *  触发action 需要传入所有相关的搜索条件 --- json格式
 */ 
const initSearch = {
    params: {},
    actions: {
        [`SEARCH_INFOLIST_TABLELIST`]({ dispatch, commit, state }, { params }) {
            initSearch.params = params;
            initList.pageno = 1;
            commit(`SET_INFOLIST_PAGECURRENT`, 1);
            dispatch(`GET_INFOLIST_TABLELIST`);
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
        [`INFOLIST_EDITSTATUS`]: 'waitting',
    },
    getters: {
        // 获取编辑加载状态
        [`INFOLIST_EDITSTATUS`]: state => state[`INFOLIST_EDITSTATUS`],
    },
    mutations: {
        // 设置编辑加载状态
        [`SET_INFOLIST_EDITSTATUS`](state, status) {
            state[`INFOLIST_EDITSTATUS`] = status;
        },
    },
    actions: {
        //  新增/修改
        [`EDIT_INFOLIST_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            //避免重复提交
            if(initListHandler.editStatus == 'loading'){
                return;
            }
            initListHandler.editStatus = 'loading';
            setTimeout(() => {
                commit(`SET_INFOLIST_EDITSTATUS`, 'loading');
                axiosINFOLISTSave(params)
                .then( data => {
                    cb && cb(data);
                    setTimeout(() => {
                        initListHandler.editStatus = 'success';
                    }, 400);
                    commit(`SET_INFOLIST_EDITSTATUS`, 'success');
                    type == 'list' && (
                        dispatch(`GET_INFOLIST_TABLELIST`)
                    );
                }).catch( e => {
                    setTimeout(() => {
                        initListHandler.editStatus = 'failure';
                    }, 400);
                    commit(`SET_INFOLIST_EDITSTATUS`, 'failure');
                });
            }, 250);
        },

        //  删除
        [`DEL_INFOLIST_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            axiosINFOLISTDel(params)
            .then( data => {
                type == 'list' && (
                    dispatch(`GET_INFOLIST_TABLELIST`)
                );
                cb && cb();
            })
        }
    }
}

/*
 *  获取筛选分类
 */
const initFilters = {
    state: {
        [`INFOLIST_FILTERS`]: {}
    },
    getters: {
        [`INFOLIST_FILTERS`]: state => state[`INFOLIST_FILTERS`],
    },
    mutations: {
        [`SET_INFOLIST_FILTERS`](state, data) {
            state[`INFOLIST_FILTERS`] = data;
        }
    },
    actions: {
        [`GET_INFOLIST_FILTERS`]({ dispatch, commit, state }, cb) {
            axiosINFOLISTPos()
            .then( data => {
                commit(`SET_INFOLIST_FILTERS`, data)
                cb && cb();
            })
        },
    }
}



const state = Object.assign({}, initList.state, initListHandler.state, initFilters.state);

const getters = Object.assign({}, initList.getters, initListHandler.getters, initFilters.getters);

const mutations = Object.assign({}, initList.mutations, initListHandler.mutations, initFilters.mutations);

const actions = Object.assign({}, initList.actions, initListHandler.actions, initSearch.actions, initFilters.actions);


export default {
    state,
    getters,
    mutations,
    actions
}