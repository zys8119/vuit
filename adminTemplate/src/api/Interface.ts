import { CreateElement, Component } from "vue"
import { Dialog } from "element-ui"
import { AxiosRequestConfig, AxiosPromise} from "axios"
import {
    statistics_getActivityInfo_data,
    statistics_getConferenceInfo_data,
    dashboard_user_rddb,
    dashboard_proposal_jianyi,
    auth_login,
    auth_getCode,
    auth_resetPwd,
    auth_generateLoginCode
} from "./type"
// todo 应用配置选项
export interface appConfigOptions {
    // 菜单配置
    MenuMap:appConfigOptions_MenuMap
}
export interface appConfigOptions_MenuMap {
    switch:boolean; // 本地环境是否开启服务器菜单
    dev:appConfigOptions_options_switch; // 开发菜单配置
    buid:appConfigOptions_options_switch; // 生产菜单配置
}
export interface appConfigOptions_options_switch {
    path:string;// 路由 url
    children:string;// 子集 children
    name:string;// 显示名称
}

// todo 弹窗
export interface $ZAlert {
    show?(options:$ZAlertOptions):void; // 显示
    hide?():void; // 隐藏
    hideAll?():void; // 隐藏全部
    vm?:{[key:number]:Component}; // 弹窗缓存
    index?:number; // 弹窗个数
}

// todo 弹窗选项
export interface $ZAlertOptions extends Dialog{
    props?:object; // 组件参数
    _event?:{
        [key:string]:()=>any;
    }; // 组件$emit监听事件
    content?:any; // 非组件内容
    components?:string; // 组件路径
    slotTitle?:CreateElement; // 标题插槽
    slotFooter?:CreateElement; // 尾部插槽
    onShow?():void; // 弹出显示回调
    onHide?():void; // 弹出关闭回调
    onOpened?():void; // 弹出显示动画结束回调
    onClosed?():void; // 弹出关闭动画结束回调
}

// todo 工具选项
export interface $utilsOption {
    /**
     * 验证手机号
     * @param num
     */
    checkPhoneNumber(mobile:string):void;
    /**
     * 扫码登录 websocket通讯
     * @param token
     * @param code
     */
    qrcodeLoginWS(token:string, code:string|number):void;
    /**
     * 生成dom 横向滚动
     * dom 元素标签 id
     * @param dom
     */
    setHorizontalScroll(dom:string):void;
    /**
     * 获取菜单配置
     * @param config
     * @param mapData
     */
    getMenuMap(config:object,mapData:appConfigOptions_options_switch):object | appConfigOptions_options_switch;
}

// todo Common接口类
export interface windowCommon extends Window{
    [key:string]:any;
    _this:any;
    common:{
        [key:string]:any;
        postUrl?:string;
        Axios?(WindowCommonAxiosRequestConfig:WindowCommonAxiosRequestConfig):AxiosPromise;
    }
}

// todo Axios配置
export interface WindowCommonAxiosRequestConfig extends AxiosRequestConfig{
    dom?:string; // 请求加载层所嵌入的Dom选择器，默认body
    loading?:boolean; // 是否需要加载层，默认true需要
    isAxiosOptions?:boolean; // 是否使用原始Axios配置，默认不使用
}

// todo api接口
interface Interface {
    v1:v1;
}

export default Interface;

// todo api ===============================start
export interface v1 {
    pc:v1_pc;
    auth:v1_auth;
}

export interface v1_pc {
    dashboard:v1_pc_dashboard;
    common:v1_pc_common;
}

export interface v1_pc_dashboard {
    statistics:v1_pc_dashboard_statistics;
    user:v1_pc_dashboard_user;
    proposal:v1_pc_dashboard_proposal;
}

export interface v1_pc_common {
    term:v1_pc_common_term;
}

export interface v1_auth {
    // 登录
    login?(data:auth_login):AxiosPromise;
    /**
     *获取验证码
     * @param data 数据
     * @param dom dom选择器
     */
    getCode?(data:auth_getCode,dom?:string):AxiosPromise;
    //重置密码
    resetPwd?(data:auth_resetPwd):AxiosPromise;
    //扫码登录
    generateLoginCode?(data:auth_generateLoginCode):AxiosPromise;
    //获取菜单及权限
    selfMenuAndRole?():AxiosPromise;
}

export interface v1_pc_dashboard_proposal {
    // 获取建议议案统计-建议统计图
    jianyi?(data:dashboard_proposal_jianyi):AxiosPromise;
    // 获取建议议案统计-议案统计表
    yian?(data:dashboard_proposal_jianyi):AxiosPromise;
    // 获取建议议案统计-历届历次统计图
    zonglan?(data:dashboard_proposal_jianyi):AxiosPromise;
    // 获取建议议案统计-历届会议
    termcount?():AxiosPromise;
}

export interface v1_pc_dashboard_user {
    // 获取历届会议历史记录详情
    rddb?(data:dashboard_user_rddb):AxiosPromise;
}

export interface v1_pc_common_term {
    // 获取历届会议历史记录
    history?():AxiosPromise;
}

export interface v1_pc_dashboard_statistics {
    // 获取登录统计
    getLoginInfo?():AxiosPromise;
    // 获取履职活动统计
    getActivityInfo?(data:statistics_getActivityInfo_data):AxiosPromise;
    // 获取履职活动统计
    getConferenceInfo?(data:statistics_getConferenceInfo_data):AxiosPromise;
}

// todo api =====================================end