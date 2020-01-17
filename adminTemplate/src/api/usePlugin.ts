import Vue from "vue"
import { PluginObject } from "vue"
import Api from "./index"
import $utils from "../utils"
import filters from "../filters"
import ContentTable from "../components/Mixins/ContentTable"

const usePlugin:PluginObject<Vue> = {
    install(vue){
        vue.prototype.$utils = $utils;
        vue.prototype.api = Api;
        vue.mixin({
            filters:filters
        });
        vue.mixin(ContentTable);
    }
};
export default usePlugin;