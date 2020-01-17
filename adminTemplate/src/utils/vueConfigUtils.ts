export interface vueConfigUtils {
    /**
     * 设置全局less变量
     * @param config webpack配置
     */
    setLessGlobalVariables?(config:object):void;
    /**
     * 设置全局js变量
     * @param config webpack配置
     */
    setJsGlobalVariables?():object;
}