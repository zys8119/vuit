import {v1_pc_common_organize, windowCommon} from "../Interface";

declare const window:windowCommon;

export default <v1_pc_common_organize>{
    listUnit(){
        return window.common.Axios({
            url: `/v1/pc/common/organize/listUnit/`,
            method: 'get',
            dom:".AsideTree",
        })
    }
}