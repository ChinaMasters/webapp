const  state = {
    flieName:'',
    showTitleAndMenu:false,
}
const getters = {
    
}
const mutations = {
    SET_FILENAME:(state,val)=>{
        state.flieName = val;
    },
    SET_SHOWTITLEANDMEN:(state)=>{
        state.showTitleAndMenu = !state.showTitleAndMenu;
    }
}
const actions = {
    setFileName:({commit},newVal)=>{
        return commit('SET_FILENAME',newVal)
    },
    setShowTitleAndMenu:({commit})=>{
        return commit('SET_SHOWTITLEANDMEN')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
