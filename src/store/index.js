import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import book from './modules/book'
export default new vuex.Store({
    modules:{
       book,
    }
})