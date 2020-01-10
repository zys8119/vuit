<template>
    <div id="Home">
        <div class="home-top">
            <el-row :gutter="10">
                <el-col :span="10">
                    <LoginStatistics title="登录统计" ref="LoginStatistics"></LoginStatistics>
                </el-col>
                <el-col :span="14">
                    <duty-activity-statistics title="履职活动统计" ref="DutyActivityStatistics"></duty-activity-statistics>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <MeetingStatistics title="会议统计" ref="MeetingStatistics"></MeetingStatistics>
                </el-col>
                <el-col :span="12">
                    <SuggestedMotionStatistics title="建议议案统计" ref="SuggestedMotionStatistics"></SuggestedMotionStatistics>
                </el-col>
            </el-row>
            <RepresentativeStatistics title="代表统计" ref="RepresentativeStatistics"></RepresentativeStatistics>
        </div>
    </div>
</template>

<script>
import LoginStatistics from "./components/LoginStatistics"
import DutyActivityStatistics from "./components/DutyActivityStatistics.vue"
import MeetingStatistics from "./components/MeetingStatistics.vue"
import SuggestedMotionStatistics from "./components/SuggestedMotionStatistics.vue"
import RepresentativeStatistics from "./components/RepresentativeStatistics.vue"
export default {
    name: "Home",
    components:{
        LoginStatistics,
        DutyActivityStatistics,
        MeetingStatistics,
        SuggestedMotionStatistics,
        RepresentativeStatistics,
    },
    mounted() {
        this.init()
    },
    methods:{
        init() {
            for(let key in this.$refs){
                this.$refs[key].init();
            }
        }
    }
}
</script>

<style scoped lang="less">
    #Home {
        padding: 10px;
        .el-row{
            &+.el-row{
                margin-top: 10px;
            }
        }
    }
</style>