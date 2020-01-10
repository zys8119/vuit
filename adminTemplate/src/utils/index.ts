/**
 * 全局工具
 */
import {$utilsOption, windowCommon} from "../api/Interface";
import QRCode from 'qrcodejs2'
declare const window:windowCommon;
export default <$utilsOption>{
    checkPhoneNumber(mobile) {
        let _mobile = mobile.replace(/(^\s*)|(\s*$)/g, "")
        var reg = /^(1[1-9][0-9])\d{8}$/i;
        if (!reg.test(_mobile)) {
            window._this.$message.error('手机号格式不正确')
            return false;
        }
        return true;
    },
    qrcodeLoginWS(token, code) {
        let url = window.common.postUrl.replace('http://', '')
        var ws
        // 本地请求 域名http请求
        if (window.location.hostname === 'localhost' || window.location.protocol === 'http:') {
            ws = new WebSocket('ws://' + url + '/app_auth/?' + token)
        } else if (window.location.protocol === 'https:') {
            ws = new WebSocket('wss://' + url + '/app_auth/?' + token)
        }
        ws.onopen = function () {
            // 制作二维码
            document.getElementById('qrcode').innerHTML = ''
            new QRCode('qrcode',{
                width: 280,
                height: 280,
                text: code
            })
        }
        ws.onmessage = function (evt) {
            var d = JSON.parse(evt.data)
            if (d.cmd === 'user_confirm') {
                sessionStorage.userInfo = JSON.stringify(d.user_info);
                window.location.hash = '/'
            }
            ws.close();
        }
    },
    setHorizontalScroll(dom) {
        if (!dom) return false
        let element = document.getElementById(dom);
        document.addEventListener('DOMMouseScroll',handler,false)
        document.addEventListener('mousewheel',handler,false)
        function handler(event){
            let detail = event.wheelDelta || event.detail;
            let moveForwardStep = 1;
            let moveBackStep = -1;
            let step = 0;
            if(detail > 0) step = moveForwardStep * 100
            else step = moveBackStep * 100
            if (element.scrollLeft) element.scrollLeft += step;
        }
    }
}