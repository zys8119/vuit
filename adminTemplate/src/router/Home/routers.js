import CommonIndex from '../../components/views/Common/Index'
export default {
    path: '/',
    name: '首页 ',
    component: CommonIndex,
    redirect: '/home',
    children: [
        {
            name: '首页',
            path:'home',
            component: () => import('../../components/views/Home/Home.vue'),
            meta:{
                Breadcrumb:false,
            }
        }
    ]

}
