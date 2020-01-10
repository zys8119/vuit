export default {
    path: '/404',
    name: '404',
    meta: {
        isAllPage: true
    },
    component: () => import('../../components/views/404/Index.vue')
}
