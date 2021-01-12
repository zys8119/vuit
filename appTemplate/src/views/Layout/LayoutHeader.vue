<template>
    <div class="LayoutHeader">
        <div class="LayoutHeaderContent">
            <div class="flexboxBox">
                <flexbox class="flexbox">
                    <flexbox-item v-if="airforce.layout.leftShow" class="left text-overflow" :span="airforce.layout.leftSpan || airforce.layout.span" @click.native="leftClick">
                        <span class="iconfont" v-if="airforce.layout.leftIcon" v-html="airforce.layout.leftIcon"></span>
                        <span v-if="airforce.layout.leftText">{{airforce.layout.leftText}}</span>
                        <span v-else>&nbsp;</span>
                    </flexbox-item>
                    <flexbox-item v-else :span="airforce.layout.leftSpan || airforce.layout.span">&nbsp;</flexbox-item>
                    <flexbox-item v-if="airforce.layout.contentShow" class="content text-overflow">
                        <span class="iconfont" v-if="airforce.layout.contentIcon" v-html="airforce.layout.contentIcon"></span>
                        <span v-if="airforce.layout.title || airforce.layout.content">{{airforce.layout.content || airforce.layout.title}}</span>
                        <span v-else>&nbsp;</span>
                    </flexbox-item>
                    <flexbox-item v-else>&nbsp;</flexbox-item>
                    <flexbox-item v-if="airforce.layout.rightShow" class="right text-overflow" :span="airforce.layout.rightSpan || airforce.layout.span">
                        <span class="iconfont" v-if="airforce.layout.rightIcon" v-html="airforce.layout.rightIcon"></span>
                        <span v-if="airforce.layout.rightText">{{airforce.layout.rightText}}</span>
                        <span v-else>&nbsp;</span>
                    </flexbox-item>
                    <flexbox-item v-else :span="airforce.layout.rightSpan || airforce.layout.span">&nbsp;</flexbox-item>
                </flexbox>
            </div>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, Box } from "vux"
    export default {
        name: "layout-header",
        components:{ Flexbox, FlexboxItem, Box },
        methods:{
            leftClick(){
                if(this.airforce.layout.isBack){
                    this.$router.back();
                    return;
                }
                this.airforce.layout.leftClick();
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    .LayoutHeader {
        width: 100%;
        height: @HeaderHeight;
        .LayoutHeaderContent{
            height: @HeaderHeight;
            overflow: hidden;
            width: 100%;
            background-color: #fff;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 2;
            line-height: @HeaderHeight;
            .flexboxBox{
                margin: 0 15px;
                .flexbox{
                    .left{
                        font-size: 14px;
                    }
                    .content{
                        text-align: center;
                        font-size: 16px;
                    }
                    .right{
                        text-align: right;
                        font-size: 14px;
                    }
                }
            }

        }
    }
</style>