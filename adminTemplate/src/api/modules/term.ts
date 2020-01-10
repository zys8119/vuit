import {v1_pc_common_term, windowCommon} from "../Interface";
declare const window:windowCommon;
export default <v1_pc_common_term>{
    history(){
        return window.common.Axios({
            url:`/v1/pc/common/term/history/`,
            dom:".RepresentativeStatistics"
        })
    }
}