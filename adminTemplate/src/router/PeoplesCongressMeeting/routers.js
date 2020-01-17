import CommonIndex from '../../components/views/Common/Index'
export default {
    path: '/peoples-congress-manage',
    name: '人代会会务',
    component: CommonIndex,
    redirect: '/peoples-congress-manage/register-manage',
    children: [
        {
            path: 'register-manage',
            name: '报道管理',
            component: () => import('../../components/views/PeoplesCongressMeeting/RegisterManage.vue'),
        }
    ]
}
