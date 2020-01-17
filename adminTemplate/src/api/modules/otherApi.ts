import {otherApi, windowCommon} from "../Interface";
declare const window:windowCommon;
declare const $ThemeBaseUrl:string;
export default <otherApi>{
    setTheme(color: string) {
        return window.common.Axios({
            url: $ThemeBaseUrl,
            method: 'get',
            dom:".SwitchThemeColor",
            data:{
                color:color
            }
        });
    },
    ContentTable(url:string,data:object){
        return window.common.Axios({
            url: url,
            data,
            method:"get",
            dom:".content-table",
        })
    }
}