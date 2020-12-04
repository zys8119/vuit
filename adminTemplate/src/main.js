import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import './components/Common/index'
import './assets/js/entry'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import usePlugin from './api/usePlugin'
Vue.use(usePlugin)
import alertVuePlug from './alert-vue-plug'
Vue.use(alertVuePlug)

Vue.config.productionTip = false

import store from './vuex/store'

router.beforeEach((to, from ,next) => {
    //设置baseURL
    window.baseURL = to.meta.baseURL;
    store.commit('SetCurrentPathInfo', to)
    // 是否左侧菜单 实现手风琴效果 一次只能展开一组
    if (store.state.menu.menuList.length > 0 && !to.meta.isAllPage) store.dispatch('RouterChange')
    next()
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
