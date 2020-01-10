import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

const routerList = []
function importAll(r) {
    r.keys().forEach(
        (key) => routerList.push(r(key).default)
    )
}

importAll(require.context('.', true, /routers.js$/))
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home',
            meta: {
                isAllPage: true
            }
        },
        ...routerList
    ]
})
