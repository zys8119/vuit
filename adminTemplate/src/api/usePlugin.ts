import Vue from "vue"
import { PluginObject } from "vue"
import Api from "./index"
import $utils from "../utils"
import filters from "../filters"

const usePlugin:PluginObject<Vue> = {
    install(vue){
        vue.prototype.$utils = $utils;
        vue.prototype.api = Api;
        vue.mixin({
            filters:filters
        })
    }
};
export default usePlugin;