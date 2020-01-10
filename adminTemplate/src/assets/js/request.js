var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable no-undef */
import { Loading } from 'element-ui';
import axios from 'axios';
import qs from 'qs';
window.common = {
    postUrl: 'https://snpctest.zhijiasoft.com',
    Axios: Axios
};
function Axios(options) {
    var baseURL = window.baseURL || window.common.postUrl;
    var method = options.method || 'get';
    var data = options.data ? method === 'get' ? options.data : qs.stringify(options.data) : '';
    var params = options.data || '';
    var isLoading = true;
    if (typeof options.loading === "boolean") {
        isLoading = options.loading;
    }
    var loadingInstance;
    var loadingDom = options.dom || '';
    var requestBody;
    requestBody = method === 'get' ? __assign(__assign({}, options), { baseURL: baseURL, params: params, method: method, timeout: 150000 }) : __assign(__assign({}, options), { baseURL: baseURL, data: data, method: method, timeout: 150000 });
    if (options.isAxiosOptions) {
        requestBody = options;
    }
    var service = axios.create();
    service.interceptors.request.use(function (config) {
        if (isLoading) {
            loadingInstance = Loading.service({ target: loadingDom || 'body' });
        }
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        if (sessionStorage.getItem('userInfo'))
            config.headers['AUTHORIZATION'] = JSON.parse(sessionStorage.getItem('userInfo')).token;
        if (sessionStorage.getItem('unit'))
            config.headers['UNIT'] = sessionStorage.getItem('unit');
        return config;
    }, function (error) {
        window._this.$message.error('系统错误');
        return Promise.reject(error);
    });
    service.interceptors.response.use(function (response) {
        if (isLoading) {
            loadingInstance.close();
        }
        if (response.data.code !== 0)
            window._this.$message.error(response.data.message);
        return new Promise(function (resolve, reject) {
            if (response.data.code === 0)
                resolve(response.data);
            else if (response.data.code === 401) {
                window.location.hash = '/login';
                reject(response.data);
            }
        });
    }, function (error) {
        if (isLoading) {
            loadingInstance.close();
        }
        window._this.$message.error(error.message);
    });
    return service(requestBody);
}
