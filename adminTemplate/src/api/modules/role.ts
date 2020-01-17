import {v1_pc_permission_role, windowCommon} from "../Interface";

declare const window:windowCommon;

export default <v1_pc_permission_role>{
    superAdminCheck(){
        return window.common.Axios({
            url:"/v2/pc/permission/role/superAdminCheck/",
            method:"get",
            dom:".RoleManagement"
        })
    },
    list(data:object){
        return window.common.Axios({
            url:"/v2/pc/permission/role/list/",
            method:"get",
            data,
            dom:".content-table"
        })
    }
}