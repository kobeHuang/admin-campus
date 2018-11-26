import { 
    axiosInfoClassify, 
    axiosInfoClassifySave,
    axiosInfoClassifyDel
} from '../../api';

//列表基础初始化
const initList = {
    state: {
        // table数据
        [`INFOCLASSIFY_TABLELISTS`]: new Array()
    },
    getters: {

        // 获取table数据
        [`INFOCLASSIFY_TABLELIST`]: state => state[`INFOCLASSIFY_TABLELISTS`]

    },
    mutations: {

        // 设置table数据
        [`SET_INFOCLASSIFY_TABLELIST`](state, { items }) {
            state[`INFOCLASSIFY_TABLELISTS`] = items;
        }
    },
    actions: {
        /* 
         *  请求获取列表数据
         *  cb  为获取数据后的回调函数
         */ 
        [`GET_INFOCLASSIFY_TABLELIST`]({ dispatch, commit, state }, cb) {
            commit(`SET_INFOCLASSIFY_TABLELIST`, {items: []});

            axiosInfoClassify()
            .then( data => {
                commit(`SET_INFOCLASSIFY_TABLELIST`, {items: data.items});
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
        [`INFOCLASSIFY_EDITSTATUS`]: 'waitting',
    },
    getters: {
        // 获取编辑加载状态
        [`INFOCLASSIFY_EDITSTATUS`]: state => state[`INFOCLASSIFY_EDITSTATUS`],
    },
    mutations: {
        // 设置编辑加载状态
        [`SET_INFOCLASSIFY_EDITSTATUS`](state, status) {
            state[`INFOCLASSIFY_EDITSTATUS`] = status;
        },
    },
    actions: {
        //  新增/修改
        [`EDIT_INFOCLASSIFY_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            //避免重复提交
            if(initListHandler.editStatus == 'loading'){
                return;
            }
            initListHandler.editStatus = 'loading';
            setTimeout(() => {
                commit(`SET_INFOCLASSIFY_EDITSTATUS`, 'loading');
                axiosInfoClassifySave(params)
                .then( data => {
                    cb && cb(data);
                    setTimeout(() => {
                        initListHandler.editStatus = 'success';
                    }, 400);
                    commit(`SET_INFOCLASSIFY_EDITSTATUS`, 'success');
                    type == 'list' && (
                        dispatch(`GET_INFOCLASSIFY_TABLELIST`)
                    );
                }).catch( e => {
                    setTimeout(() => {
                        initListHandler.editStatus = 'failure';
                    }, 400);
                    commit(`SET_INFOCLASSIFY_EDITSTATUS`, 'failure');
                });
            }, 250);
        },
        //  删除
        [`DEL_INFOCLASSIFY_HANDLER`]({ dispatch, commit, state }, { params, type, cb }) {
            axiosInfoClassifyDel(params)
            .then( data => {
                type == 'list' && (
                    dispatch(`GET_INFOCLASSIFY_TABLELIST`)
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