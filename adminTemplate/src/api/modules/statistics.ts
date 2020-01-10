import { v1_pc_dashboard_statistics, windowCommon} from "../Interface"
declare const window:windowCommon;
export default <v1_pc_dashboard_statistics>{
    getLoginInfo(){
        return window.common.Axios({
            url: '/v1/pc/dashboard/statistics/getLoginInfo/',
            method: 'get',
            dom: '.static-content'
        })
    },
    getActivityInfo(data){
        return window.common.Axios({
            url:`/v1/pc/dashboard/statistics/getActivityInfo/`,
            dom: '.DutyActivityStatistics',
            data,
        })
    },
    getConferenceInfo(data){
        return window.common.Axios({
            url:`/v1/pc/dashboard/statistics/getConferenceInfo/`,
            data,
            dom:".MeetingStatistics"
        })
    }
}