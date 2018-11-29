import { 
    axiosLifes, 
    axiosLifeSave, 
    axiosLifeDel,
} from '../../api';

//列表基础初始化
const initList = {
    pageno: 1,
    state: {

        // table数据
        [`LIFE_TABLELISTS`]: new Array()
    },
    getters: {

        // 获取table数据
        [`LIFE_TABLELIST`]: state => state[`LIFE_TABLELISTS`]
    },
    mutations: {

        // 设置table数据
        [`SET_LIFE_TABLELIST`](state, { items }) {
            state[`LIFE_TABLELISTS`] = items;
        },
    },
    actions: {
        /* 
         *  请求获取列表数据
         *  页码，size，keyword会被默认传入
         *  cb  为获取数据后的回调函数
         */ 
        [`GET_LIFE_TABLELIST`]({ dispatch, commit, state }, cb) {
            commit(`SET_LIFE_TABLELIST`, {items: []});

            axiosLifes()
            .then( data => {
                commit(`SET_LIFE_TABLELIST`, {items: data.items});
                cb && cb(true);
            }).catch( e => {
                cb && cb(false);
            });
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
        [`LIFE_EDITSTATUS`]: 'waitting',
    },
    getters: {
        // 获取编辑加载状态
        [`LIFE_EDITSTATUS`]: state => state[`LIFE_EDITSTATUS`],
    },
    mutations: {
        // 设置编辑加载状态
        [`SET_LIFE_EDITSTATUS`](state, status) {
            state[`LIFE_EDITSTATUS`] = status;
        },
    },
    actions: {
        //  新增/修改
        [`EDIT_LIFE_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            //避免重复提交
            if(initListHandler.editStatus == 'loading'){
                return;
            }
            initListHandler.editStatus = 'loading';
            setTimeout(() => {
                commit(`SET_LIFE_EDITSTATUS`, 'loading');
                axiosLifeSave(params)
                .then( data => {
                    cb && cb(data);
                    setTimeout(() => {
                        initListHandler.editStatus = 'success';
                    }, 400);
                    commit(`SET_LIFE_EDITSTATUS`, 'success');
                    type == 'list' && (
                        dispatch(`GET_LIFE_TABLELIST`)
                    );
                }).catch( e => {
                    setTimeout(() => {
                        initListHandler.editStatus = 'failure';
                    }, 400);
                    commit(`SET_LIFE_EDITSTATUS`, 'failure');
                });
            }, 250);
        },

        //  删除
        [`DEL_LIFE_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            axiosLifeDel(params)
            .then( data => {
                type == 'list' && (
                    dispatch(`GET_LIFE_TABLELIST`)
                );
                cb && cb();
            })
        }
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