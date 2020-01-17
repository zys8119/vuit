/* eslint-disable */
// @ts-ignore
import ZXDialogAlert from './ZXDialogAlert.vue'
import {$ZAlert, $ZAlertOptions} from "../api/Interface";
import Vue from "vue"
import { PluginObject } from "vue"
const plugin:PluginObject<Vue> = {
    install (vue) {
        const $ZXDialogAlert = <$ZAlert>{
            show:(opts:$ZAlertOptions)=>{
                let $vm;
                const Toast = vue.extend(ZXDialogAlert)
                if (!$vm) {
                    $vm = new Toast({
                        el: document.createElement('div')
                    });
                    document.body.appendChild($vm.$el)
                }
                vue.prototype.$ZAlert.vm[vue.prototype.$ZAlert.index] = $vm;
                vue.prototype.$ZAlert.index += 1;
                $vm.show = false;
                $vm.showBox = false;
                opts = Object.assign({},opts);
                opts.props = opts.props || {};
                opts._event = opts._event || {};
                opts.content = opts.content || null;
                opts.components = opts.components || null;
                let FilterField = {
                    onShow:true,
                    onHide:true,
                    onOpened:true,
                    onClosed:true,
                    _event:true,
                };
                for(var i in opts){
                    if(FilterField[i]){
                        if(typeof opts[i] === "function"){
                            $vm[i] = (function (key,callback) {
                                return function () {
                                    callback.call(this);
                                    opts[key].call(this);
                                }
                            })(i,$vm[i]);
                        }else {
                            $vm[i] = opts[i];
                        }
                    }else {
                        $vm.$props[i] = opts[i];
                    }
                }
                $vm.show = true;
                $vm.showBox = true;
                return vue.prototype.$ZAlert.index-1;
            },
            hide(){
                if(vue.prototype.$ZAlert.index <= 0){
                    return;
                }
                vue.prototype.$ZAlert.index -= 1;
                let $vm = vue.prototype.$ZAlert.vm[vue.prototype.$ZAlert.index];
                if($vm){
                    $vm.show = false;
                }
                vue.prototype.$ZAlert.index += 1;
            },
            hideAll(){
                let $vmAll = vue.prototype.$ZAlert.vm;
                for(let k in $vmAll){
                    let $vm = $vmAll[k];
                    if($vm){
                        $vm.show = false;
                    }
                }
            },
            vm:{},
            index:0,
        };
        if(!vue.prototype.$ZAlert){
            vue.prototype.$ZAlert =  $ZXDialogAlert;
        }
    }
}
export default plugin
export const install = plugin.install