import {v1_auth, windowCommon} from "../Interface";
declare const window:windowCommon;
export default <v1_auth>{
    login(data){
        return window.common.Axios({
            url: '/v1/auth/login/',
            data,
            method: 'post',
            dom: '.main-content'
        })
    },
    getCode(data,dom = '.main-content'){
        return window.common.Axios({
            url: '/v1/auth/getCode/',
            data,
            method: 'post',
            dom
        })
    },
    resetPwd(data){
        return window.common.Axios({
            url: '/v1/auth/resetPwd/',
            data,
            method: 'post',
            dom: '.forget-content'
        })
    },
    generateLoginCode(data){
        return window.common.Axios({
            url: '/v1/auth/generateLoginCode/',
            data,
            method: 'get',
            dom: '.scan-login-content'
        })
    }
}