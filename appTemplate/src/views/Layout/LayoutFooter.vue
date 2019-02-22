<template>
    <div class="LayoutFooter">
        <div class="LayoutFooterContent">
            <flexbox class="flexbox">
                <flexbox-item class="flexbox-item" :class="{select:item.navKey == airforce.layout.navKey}" v-for="item,index in navData" :key="index" @click.native="go(item)">
                    <div class="iconfont" :class="{b:item.isbold}" v-if="item.icon" v-html="item.icon">&#xe624;</div>
                    <div class="text">{{item.name}}</div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import navData from "./navData.js"
    import { Flexbox, FlexboxItem } from "vux"
    export default {
        name: "layout-footer",
        components:{ Flexbox, FlexboxItem },
        data(){
            return {
                navData:navData
            }
        },
        methods:{
            go(item){
                if(item.link){
                    this.$router.push(item.link);
                    return;
                };
                if (typeof item.click == "function"){
                    item.click();
                };
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .LayoutFooter {
        height: @FooterHeight;
        width: 100%;
        .LayoutFooterContent{
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            background-color: #FFFFFF;
            box-shadow: 0 0 5px #eee;
            height: @FooterHeight;
            overflow: hidden;
            z-index: 2;
            .flexbox{
                .flexbox-item{
                    text-align: center;
                    height: @FooterHeight;
                    color: #999;
                    overflow: hidden;
                    @h:25px;
                    @th:20px;
                    .iconfont{
                        font-size: @h;
                        height: @h;
                        line-height: @h;
                        display: inline-block;
                        margin: auto;
                        text-align: center;
                        margin-top: (@FooterHeight - @h - @th)/2;
                        &.b{
                            font-weight: bold;
                        }
                    }
                    .text{
                        font-size: 12px;
                        height: @th;
                    }
                    &.select{
                        color: @themeColor;
                        .text{
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
</style>