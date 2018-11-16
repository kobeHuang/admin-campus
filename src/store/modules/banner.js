import { axiosBannerPos, axiosBanners, axiosBannerSave } from '../../api';

//列表基础初始化
const initList = {
    pageno: 1,
    state: {

        // table数据
        [`BANNER_TABLELISTS`]: new Array(),

        // 数据总数
        [`BANNER_LISTCOUNT`]: 0,

        // 数据每页数量
        [`BANNER_PAGESIZE`]: 10,

        // 数据当前页码
        [`BANNER_PAGECURRENT`]: 1
    },
    getters: {

        // 获取table数据
        [`BANNER_TABLELIST`]: state => state[`BANNER_TABLELISTS`],

        // 获取数据总数
        [`BANNER_LISTCOUNT`]: state => state[`BANNER_LISTCOUNT`],

        // 获取每页数量
        [`BANNER_PAGESIZE`]: state => state[`BANNER_PAGESIZE`],

        // 获取当前页码
        [`BANNER_PAGECURRENT`]: state => state[`BANNER_PAGECURRENT`]
    },
    mutations: {

        // 设置table数据
        [`SET_BANNER_TABLELIST`](state, { items }) {
            state[`BANNER_TABLELISTS`] = items;
        },

        // 设置数据总数
        [`SET_BANNER_LISTCOUNT`](state, count) {
            state[`BANNER_LISTCOUNT`] = count;
        },

        // 设置当前页码
        [`SET_BANNER_PAGECURRENT`](state, count) {
            state[`BANNER_PAGECURRENT`] = count;
        },
    },
    actions: {
        /* 
         *  请求获取列表数据
         *  页码，size，keyword会被默认传入
         *  cb  为获取数据后的回调函数
         */ 
        [`GET_BANNER_TABLELIST`]({ dispatch, commit, state }, cb) {
            commit(`SET_BANNER_TABLELIST`, {items: []});

            let _params = {
                pageNo: initList.pageno,
                pageSize: state[`BANNER_PAGESIZE`],
            };
            
            initSearch && (
                _params = Object.assign({}, _params, initSearch.params)
            );

            axiosBanners(_params)
            .then( data => {
                commit(`SET_BANNER_TABLELIST`, {items: data.items});
                commit(`SET_BANNER_LISTCOUNT`, data.count);
                cb && cb(true);
            }).catch( e => {
                cb && cb(false);
            });
        },

        /*
         *  页码切换调用
         */
        [`CHANGE_BANNER_TABLELIST`]({ dispatch, commit, state }, num) {
            initList.pageno = num;
            commit(`SET_BANNER_PAGECURRENT`, num);
            dispatch(`GET_BANNER_TABLELIST`);
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
        [`SEARCH_BANNER_TABLELIST`]({ dispatch, commit, state }, { params }) {
            initSearch.params = params;
            initList.pageno = 1;
            commit(`SET_BANNER_PAGECURRENT`, 1);
            dispatch(`GET_BANNER_TABLELIST`);
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
        [`BANNER_EDITSTATUS`]: 'waitting',
    },
    getters: {
        // 获取编辑加载状态
        [`BANNER_EDITSTATUS`]: state => state[`BANNER_EDITSTATUS`],
    },
    mutations: {
        // 设置编辑加载状态
        [`SET_BANNER_EDITSTATUS`](state, status) {
            state[`BANNER_EDITSTATUS`] = status;
        },
    },
    actions: {
        //  新增/修改
        [`EDIT_BANNER_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            //避免重复提交
            if(initListHandler.editStatus == 'loading'){
                return;
            }
            initListHandler.editStatus = 'loading';
            setTimeout(() => {
                commit(`SET_BANNER_EDITSTATUS`, 'loading');
                axiosBannerSave(params)
                .then( data => {
                    cb && cb(data);
                    setTimeout(() => {
                        initListHandler.editStatus = 'success';
                    }, 400);
                    commit(`SET_BANNER_EDITSTATUS`, 'success');
                    type == 'list' && (
                        dispatch(`GET_BANNER_TABLELIST`)
                    );
                }).catch( e => {
                    setTimeout(() => {
                        initListHandler.editStatus = 'failure';
                    }, 400);
                    commit(`SET_BANNER_EDITSTATUS`, 'failure');
                });
            }, 250);
        },

        //  删除
        [`DEL_BANNER_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            myAxios('post', config[moduleName].del, params)
            .then( data => {
                type == 'list' && (
                    dispatch(`GET_BANNER_TABLELIST`)
                );
                cb && cb();
            })
        },
        //修改状态
        [`CHECKSTATUS_BANNER_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            myAxios('post', config[moduleName].checkStatus, params)
            .then( data => {
                cb && cb();
            })
            .catch( e => {
                type == 'list' && (
                    dispatch(`GET_BANNER_TABLELIST`)
                );
            })
        }
    }
}

/*
 *  获取筛选分类
 */
const initFilters = {
    state: {
        [`BANNER_FILTERS`]: {}
    },
    getters: {
        [`BANNER_FILTERS`]: state => state[`BANNER_FILTERS`],
    },
    mutations: {
        [`SET_BANNER_FILTERS`](state, data) {
            state[`BANNER_FILTERS`] = data;
        }
    },
    actions: {
        [`GET_BANNER_FILTERS`]({ dispatch, commit, state }, cb) {
            axiosBannerPos()
            .then( data => {
                commit(`SET_BANNER_FILTERS`, data)
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