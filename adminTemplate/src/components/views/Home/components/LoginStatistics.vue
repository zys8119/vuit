<template>
    <home-card :title="title" class="static-content LoginStatistics">
        <div class="con" v-for="(item, key) in staticInfo" :key="key">
            <div class="title">
                <span v-text="item.title"></span>
                <span v-text="item.unit"></span>
            </div>
            <div class="b-con">
                <div class="left">
                    <span class="t">APP端</span>
                    <span class="num" v-text="item.app"></span>
                </div>
                <div class="right">
                    <span class="t">PC端</span>
                    <span class="num" v-text="item.pc"></span>
                </div>
            </div>
        </div>
    </home-card>
</template>

<script>
export default {
    name: "LoginStatistics",
    props:{
        title:{
            type:String,
            default:null,
        }
    },
    data() {
        return {
            staticInfo: [
                {title: '今日登录人数:', unit: '(人)', app: 0, pc: 0},
                {title: '累计总登录人次:', unit: '(人次)', app: 0, pc: 0},
            ]
        }
    },
    methods: {
        // 初始化
        init() {
            this.api.v1.pc.dashboard.statistics.getLoginInfo().then(res => {
                this.staticInfo[0].app = res.data.current_day.data[0].num
                this.staticInfo[0].pc = res.data.current_day.data[1].num
                this.staticInfo[1].app = res.data.login_history.data[0].num
                this.staticInfo[1].pc = res.data.login_history.data[1].num
            }).catch(() => {})
        }
    }
}
</script>

<style scoped lang="less">
@import "../../../../assets/style/less/constant";
.LoginStatistics{
    height: 394px;
    .con {
        margin-top: 30px;
        .title {
            display: flex;
            justify-content: space-between;
            line-height: 40px;
            font-size: @title-font-size;
        }
        .b-con {
            display: flex;
            div {
                flex: 1;
                span {
                    display: block;
                    line-height: 40px;
                    text-align: center;
                }
                span.num {
                    color: @main-color;
                    font-size: 30px;
                }
            }
            .left {
                border-right: 1px solid @border-color;
            }
        }
    }
}
</style>