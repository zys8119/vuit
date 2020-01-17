<template>
    <layout-filter-content :class="`FilterContent ${currentType}`">
        <!--default-->
        <slot v-if="currentType === 'default'">
            <template slot="filterLeft">
                <slot name="left">
                    <el-dropdown v-if="$slots.menu">
                        <span class="el-dropdown-link iconfont">&#xe639;</span>
                        <el-dropdown-menu slot="dropdown">
                            <slot name="menu"></slot>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-input class="el-input"
                              v-if="configs.input"
                              v-model="currentValue"
                              :placeholder="configs.placeholder"
                              @change="(configs.search)? $emit(configs.search,currentValue):fn"
                    ></el-input>
                    <el-button v-if="configs.searchText" @click="(configs.search)? $emit(configs.search,currentValue):fn" type="success">{{configs.searchText}}</el-button>
                    <el-button v-if="configs.resetText" @click="(configs.reset)? $emit(configs.reset,currentValue):fn">{{configs.resetText}}</el-button>
                </slot>
            </template>
            <template slot="filterRight">
                <slot name="right">
                    <z-button  v-for="(item,key) in configs.rightBtns" :key="key" :config="item" @click="(item.emit)? $emit($event.emit,$event):fn"></z-button>
                </slot>
            </template>
        </slot>
    </layout-filter-content>
</template>

<script>
import configs from "@/data/ComponentsConfig"
export default {
    name: "FilterContent",
    props:{
        type:{
            type:String,
            default: null
        },
        config:{
            type:Object,
            default:Object,
        },
        value:{
            type:String,
            default:null,
        }
    },
    data(){
        return {
            currentValue:null
        }
    },
    mounted() {
        this.valueCalc();
    },
    watch:{
        value(){
            this.valueCalc();
        },
        currentValue(val){
            this.$emit("input",val);
        }
    },
    computed:{
        currentType(){
            return this.type || "default";
        },
        configs(){
            try {
                return Object.assign(JSON.parse(JSON.stringify(configs[this.currentType])),this.config);
            }catch (e) {
                console.error(e.message);
            }
            return JSON.parse(JSON.stringify(configs.default));
        },
    },
    methods:{
        fn(){},
        valueCalc(){
            this.currentValue = this.value;
        }
    }
}
</script>

<style scoped lang="less">
.FilterContent{
    padding: 0 !important;
    &/deep/ .LayoutLeftContent-el-main{
        padding: 0 !important;
        .LayoutFilterContentFilter{
            padding: 0 !important;
        }
    }
    .el-input{
        width: 230px;
        margin-right: @unit15;
    }
    &.default{
        span{
            &.iconfont{
                width: 40px;
                display: inline-block;
                cursor: pointer;
                line-height: 40px;
                &:hover{
                    color: #0AAF38;
                }
            }
        }
    }
}
</style>