import {v1_pc_dashboard_user, windowCommon} from "../Interface";
declare const window:windowCommon
export default <v1_pc_dashboard_user>{
    rddb(data){
        return window.common.Axios({
            url:`/v1/pc/dashboard/user/rddb/`,
            data,
            dom:".RepresentativeStatistics"
        })
    }
}