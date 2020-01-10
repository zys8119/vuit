export default {
    path: '/login',
    name: '登录',
    meta: {
        isAllPage: true
    },
    component: () => import('../../components/views/System/Login.vue')
}
