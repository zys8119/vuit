import CommonIndex from '../../components/views/Common/Index'
export default {
    path: '/system-management',
    name: '系统管理',
    component: CommonIndex,
    redirect: '/system-management/permission-settings',
    children: [
        {
            path: 'permission-settings',
            name: '权限设置',
            component: CommonIndex,
            redirect: '/system-management/permission-settings/role-management',
            children: [
                {
                    path: 'role-management',
                    name: '角色管理',
                    component: () => import('../../components/views/SystemManagement/PermissionSettings/RoleManagement.vue'),
                }
            ]
        }
    ]
}
