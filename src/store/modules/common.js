
const state = {
    sideBarVisible: true
}

const getters = {
    sideBarVisible: state => state.sideBarVisible
}

const mutations = {
    SET_SIDEBARVISIBLE(state, flag) {
        state.sideBarVisible = flag;
    }
}

export default {
    state,
    getters,
    mutations
}