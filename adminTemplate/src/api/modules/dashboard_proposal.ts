import {v1_pc_dashboard_proposal, windowCommon} from "../Interface";
declare const window:windowCommon;
export default <v1_pc_dashboard_proposal>{
    jianyi(data){
        return window.common.Axios({
            url:`/v1/pc/dashboard/proposal/jianyi/`,
            data,
            dom:".SuggestedMotionStatistics"
        })
    },
    yian(data){
        return window.common.Axios({
            url:`/v1/pc/dashboard/proposal/yian/`,
            data,
            dom:".SuggestedMotionStatistics"
        })
    },
    zonglan(data){
        return window.common.Axios({
            url:`/v1/pc/dashboard/proposal/zonglan/`,
            data,
            dom:".SuggestedMotionStatistics"
        })
    },
    termcount(){
        return window.common.Axios({
            url:`/v1/pc/dashboard/proposal/termcount/`,
        })
    }
}