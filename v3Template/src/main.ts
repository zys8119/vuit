import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import MyPul from './MyPul';

router.beforeEach((to, from, next) => {
    next();
})
createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .use(MyPul)
    .mount('#app')