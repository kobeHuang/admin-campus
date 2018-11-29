import { 
    axiosLifeImages, 
    axioslifeImageSave, 
    axioslifeImageDel,
    axiosLifes
} from '../../api';

//列表基础初始化
const initList = {
    pageno: 1,
    state: {

        // table数据
        [`LIFEIMAGE_TABLELISTS`]: new Array(),

        // 数据总数
        [`LIFEIMAGE_LISTCOUNT`]: 0,

        // 数据每页数量
        [`LIFEIMAGE_PAGESIZE`]: 10,

        // 数据当前页码
        [`LIFEIMAGE_PAGECURRENT`]: 1
    },
    getters: {

        // 获取table数据
        [`LIFEIMAGE_TABLELIST`]: state => state[`LIFEIMAGE_TABLELISTS`],

        // 获取数据总数
        [`LIFEIMAGE_LISTCOUNT`]: state => state[`LIFEIMAGE_LISTCOUNT`],

        // 获取每页数量
        [`LIFEIMAGE_PAGESIZE`]: state => state[`LIFEIMAGE_PAGESIZE`],

        // 获取当前页码
        [`LIFEIMAGE_PAGECURRENT`]: state => state[`LIFEIMAGE_PAGECURRENT`]
    },
    mutations: {

        // 设置table数据
        [`SET_LIFEIMAGE_TABLELIST`](state, { items }) {
            state[`LIFEIMAGE_TABLELISTS`] = items;
        },

        // 设置数据总数
        [`SET_LIFEIMAGE_LISTCOUNT`](state, count) {
            state[`LIFEIMAGE_LISTCOUNT`] = count;
        },

        // 设置当前页码
        [`SET_LIFEIMAGE_PAGECURRENT`](state, count) {
            state[`LIFEIMAGE_PAGECURRENT`] = count;
        },
    },
    actions: {
        /* 
         *  请求获取列表数据
         *  页码，size，keyword会被默认传入
         *  cb  为获取数据后的回调函数
         */ 
        [`GET_LIFEIMAGE_TABLELIST`]({ dispatch, commit, state }, cb) {
            commit(`SET_LIFEIMAGE_TABLELIST`, {items: []});

            let _params = {
                pageNo: initList.pageno,
                pageSize: state[`LIFEIMAGE_PAGESIZE`],
            };
            
            initSearch && (
                _params = Object.assign({}, _params, initSearch.params)
            );

            axiosLifeImages(_params)
            .then( data => {
                commit(`SET_LIFEIMAGE_TABLELIST`, {items: data.items});
                commit(`SET_LIFEIMAGE_LISTCOUNT`, data.count);
                cb && cb(true);
            }).catch( e => {
                cb && cb(false);
            });
        },

        /*
         *  页码切换调用
         */
        [`CHANGE_LIFEIMAGE_TABLELIST`]({ dispatch, commit, state }, num) {
            initList.pageno = num;
            commit(`SET_LIFEIMAGE_PAGECURRENT`, num);
            dispatch(`GET_LIFEIMAGE_TABLELIST`);
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
        [`SEARCH_LIFEIMAGE_TABLELIST`]({ dispatch, commit, state }, { params }) {
            initSearch.params = params;
            initList.pageno = 1;
            commit(`SET_LIFEIMAGE_PAGECURRENT`, 1);
            dispatch(`GET_LIFEIMAGE_TABLELIST`);
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
        [`LIFEIMAGE_EDITSTATUS`]: 'waitting',
    },
    getters: {
        // 获取编辑加载状态
        [`LIFEIMAGE_EDITSTATUS`]: state => state[`LIFEIMAGE_EDITSTATUS`],
    },
    mutations: {
        // 设置编辑加载状态
        [`SET_LIFEIMAGE_EDITSTATUS`](state, status) {
            state[`LIFEIMAGE_EDITSTATUS`] = status;
        },
    },
    actions: {
        //  新增/修改
        [`EDIT_LIFEIMAGE_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            //避免重复提交
            if(initListHandler.editStatus == 'loading'){
                return;
            }
            initListHandler.editStatus = 'loading';
            setTimeout(() => {
                commit(`SET_LIFEIMAGE_EDITSTATUS`, 'loading');
                axioslifeImageSave(params)
                .then( data => {
                    cb && cb(data);
                    setTimeout(() => {
                        initListHandler.editStatus = 'success';
                    }, 400);
                    commit(`SET_LIFEIMAGE_EDITSTATUS`, 'success');
                    type == 'list' && (
                        dispatch(`GET_LIFEIMAGE_TABLELIST`)
                    );
                }).catch( e => {
                    setTimeout(() => {
                        initListHandler.editStatus = 'failure';
                    }, 400);
                    commit(`SET_LIFEIMAGE_EDITSTATUS`, 'failure');
                });
            }, 250);
        },

        //  删除
        [`DEL_LIFEIMAGE_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            axioslifeImageDel(params)
            .then( data => {
                type == 'list' && (
                    dispatch(`GET_LIFEIMAGE_TABLELIST`)
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
        [`LIFEIMAGE_FILTERS`]: []
    },
    getters: {
        [`LIFEIMAGE_FILTERS`]: state => state[`LIFEIMAGE_FILTERS`],
    },
    mutations: {
        [`SET_LIFEIMAGE_FILTERS`](state, data) {
            state[`LIFEIMAGE_FILTERS`] = data.items;
        }
    },
    actions: {
        [`GET_LIFEIMAGE_FILTERS`]({ dispatch, commit, state }, cb) {
            axiosLifes()
            .then( data => {
                commit(`SET_LIFEIMAGE_FILTERS`, data)
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