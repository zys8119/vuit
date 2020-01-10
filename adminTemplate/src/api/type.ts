export type yyymmdd = "yyyy-MM-dd";
export type statistics_getActivityInfo_data = {
    year?:string; // 年份
    month?:string; // 月份
    type?:string; // 类型
}
export type statistics_getConferenceInfo_data = {
    reg_date_start?:yyymmdd; // 开始时间
    reg_date_end?:yyymmdd; // 结束时间
}
export type dashboard_user_rddb = {
    term_count?:string; // 历届会议的历史id
}
export type dashboard_proposal_jianyi = {
    secondary_name?:string; // 历届会议的历史id
}
export type auth_login = {
    //账号登录=================
    account?:string; // 账号
    password?:string; // 密码
    //手机登录=================
    mobile_phone?:string; // 手机号
    code?:string; // 验证码
    // 必须字段
    source:number; // 资源
    way:number; // 途径
}
export type auth_getCode = {
    type:number; // 类型
    mobile_phone:string;// 手机号
}
export type auth_resetPwd = {
    code:number; // 验证码
    mobile_phone:string;// 手机号
    new_pwd:string;// 新密码
}
export type auth_generateLoginCode = {
    code:number; // 验证码
    mobile_phone:string;// 手机号
    new_pwd:string;// 新密码
}