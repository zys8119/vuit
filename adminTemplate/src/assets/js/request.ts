/* eslint-disable no-undef */
import { Loading } from 'element-ui';
import { windowCommon, WindowCommonAxiosRequestConfig } from '../../api/Interface';
import axios from 'axios'
import qs from 'qs'
declare const window:windowCommon;
declare const Promise:any;

window.common = {
    postUrl: 'https://snpctest.zhijiasoft.com',
    Axios
}

function Axios(options:WindowCommonAxiosRequestConfig) {
    let baseURL = window.baseURL || window.common.postUrl;
    let method = options.method || 'get';
    let data = options.data ? method === 'get' ? options.data : qs.stringify(options.data) : '';
    let params = options.data || '';
    let isLoading = true;
    if(typeof options.loading === "boolean"){isLoading = options.loading;}
    let loadingInstance;
    let loadingDom = options.dom || '';
    let requestBody:WindowCommonAxiosRequestConfig;
    requestBody = method === 'get' ? { ...options, baseURL, params, method, timeout: 150000} : { ...options, baseURL, data,  method,  timeout: 150000 };
    if(options.isAxiosOptions){requestBody = options;}

    const service = axios.create();

    service.interceptors.request.use(config => {
        if(isLoading){loadingInstance = Loading.service({target: loadingDom || 'body'});}
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        if (sessionStorage.getItem('userInfo')) config.headers['AUTHORIZATION'] = JSON.parse(sessionStorage.getItem('userInfo')).token;
        if (sessionStorage.getItem('unit')) config.headers['UNIT'] = sessionStorage.getItem('unit');
        return config;
    }, error => {
        window._this.$message.error('系统错误')
        return Promise.reject(error);
    });

    service.interceptors.response.use(response => {
        if(isLoading) {loadingInstance.close()}
        if (response.data.code !== 0) window._this.$message.error(response.data.message)
        return new Promise((resolve, reject) => {
            if (response.data.code === 0) resolve(response.data)
            else if (response.data.code === 401) {
                window.location.hash = '/login'
                reject(response.data)
            }
        })
    }, error => {
        if(isLoading) {loadingInstance.close()}
        window._this.$message.error(error.message)
    });

    return service(requestBody)
}
