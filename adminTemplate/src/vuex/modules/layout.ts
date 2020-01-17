import { Module } from "vuex"
import Vue from "vue"
import LayoutConfig from "../../data/Layout"
import { VuexModules_layout } from "../../api/Interface";
export default <Module<any, any> & VuexModules_layout>{
    state:{
        ...LayoutConfig
    },
    mutations:{
        setLayout(state,stateData){
            let  newState ={
                ...LayoutConfig,
                ...stateData
            };
            for(let k in newState){
                Vue.set(state,k,null);
                Vue.set(state,k,newState[k]);
            }
        },
        setBreadcrumb(state,data = []){
            state.BreadcrumbData = data;
        }
    },
}