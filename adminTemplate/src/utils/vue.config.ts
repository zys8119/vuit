import {vueConfigUtils} from "./vueConfigUtils";

module.exports = class VueConfig implements vueConfigUtils{
    constructor() {
    }
    setLessGlobalVariables(config){
        const oneOfsMap = config.module.rule('less').oneOfs.store;
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: './src/assets/style/less/constant.less',
                })
                .end()
        })
    }
    setJsGlobalVariables(){
        return {
            // 获取主题配置接口
            "$ThemeBaseUrl":"'http://localhost:3000/getcss'"
        }
    }
}