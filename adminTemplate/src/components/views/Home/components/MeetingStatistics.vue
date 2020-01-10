<template>
    <home-card height="600px" :title="title"  class="MeetingStatistics">
        <div class="active-content">
            <div class="echart-title">
                <div class="left">
                    <div>会议总数：<span>{{meeting_num}}</span>场</div>
                    <div>文件总数：<span>{{file_num}}</span>件</div>
                </div>
                <div class="right">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <echarts height="500px" type="Horizontal_cylinder" :data="echartsData"></echarts>
        </div>
    </home-card>
</template>

<script>
export default {
    name: "MeetingStatistics",
    props:{
        title:{
            type:String,
            default:null,
        }
    },
    data() {
        return {
            time:null,
            meeting_num:0,
            file_num:0,
            echartsData:{},
        }
    },
    watch:{
        time() {
            this.init();
        },
    },
    methods:{
        init(){
            let reg_date_start = "";
            let reg_date_end = "";
            if(this.time && this.time.length  === 2){
                reg_date_start = this.time[0];
                reg_date_end = this.time[1];
            }
            this.api.v1.pc.dashboard.statistics.getConferenceInfo({
                reg_date_start:reg_date_start,
                reg_date_end:reg_date_end,
            }).then(res=>{
                this.meeting_num = res.data.meeting_num;
                this.file_num = res.data.file_num;
                this.echartsData = res.data;
            })
        }
    }
}
</script>

<style lang="less">
.MeetingStatistics{
    .active-content{
        .echart-title{
            overflow: hidden;
            margin: 15px 0;
            .left{
                float: left;
                line-height: 28px;
                font-size: 16px;
                color: #000000;
                span{
                    font-size: 24px;
                    color: #BC0000;
                }
            }
            .right{
                float: right;
                margin-top: 14px;
                .el-date-editor{
                    margin-right: 5px;
                    padding-top: 0;
                    padding-bottom: 0;
                    .el-input__inner{
                        height: 28px;
                    }
                    .el-range-input{
                        .el-input__inner;
                    }
                    .el-input__icon{
                        line-height: 28px;
                    }
                }
                .el-select{
                    .el-date-editor;
                }
            }
        }
    }
}
</style>