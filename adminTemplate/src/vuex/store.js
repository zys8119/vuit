import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import layout from './modules/layout'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        menu,
        layout,
    }
})

export default store
