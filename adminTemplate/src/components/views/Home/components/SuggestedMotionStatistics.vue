<template>
    <home-card height="600px" :title="title"  class="SuggestedMotionStatistics">
        <el-select v-model="selectVal" slot="header-right" class="header-right-select">
            <el-option key="1" label="建议统计图" :value="1"></el-option>
            <el-option key="2" label="议案统计表" :value="2"></el-option>
            <el-option key="3" label="历届历次统计图" :value="3"></el-option>
        </el-select>
        <div class="active-content">
            <div class="echart-title">
                <div class="left">
                    <div  v-if="selectVal === 1">建议总数：<span>{{total}}</span>条</div>
                    <div  v-if="selectVal === 2">议案总数：<span>{{total}}</span>条</div>
                    <div  v-if="selectVal === 3">
                        议案总数：<span>{{total_one}}</span>条
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        建议总数：<span>{{total_two}}</span>条</div>
                </div>
                <div class="right">
                    <el-select v-model="selectMeeting" multiple  placeholder="请选择会议"  slot="header-right" class="header-right-select type1">
                        <el-option :label="item" :value="item" v-for="(item, key) in MeetingList" :key="key"></el-option>
                    </el-select>
                </div>
            </div>
            <echarts height="500px" type="cylinder" :data="echartsData" v-if="selectVal === 1"></echarts>
            <el-table :data="list"  v-if="selectVal === 2">
                <el-table-column label="议案名称" prop="name"></el-table-column>
                <el-table-column label="代表" prop="comorgroup_ch" width="80px"></el-table-column>
                <el-table-column label="届次" prop="secondary_name" width="160px"></el-table-column>
            </el-table>
            <echarts height="500px" type="line_type" :data="echartsData" v-if="selectVal === 3"></echarts>
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
            selectVal:1,
            selectMeeting:[],
            total:0,
            total_one:0,
            total_two:0,
            MeetingList:[],
            list:[],
            echartsData:{},
        }
    },
    watch:{
        selectMeeting() {
            this.init();
        },
        selectVal(){
            this.init();
        }
    },
    methods:{
        init(){
            switch (this.selectVal) {
            case 1:
                this.api.v1.pc.dashboard.proposal.jianyi({
                    secondary_name:this.selectMeeting.join()
                }).then(res=>{
                    this.total = res.data.total;
                    this.echartsData = res.data;
                });
                break;
            case 2:
                this.api.v1.pc.dashboard.proposal.yian({
                    secondary_name:this.selectMeeting.join()
                }).then(res=>{
                    this.total = res.data.total;
                    this.list = res.data.list;
                });
                break;
            case 3:
                this.api.v1.pc.dashboard.proposal.zonglan({
                    secondary_name:this.selectMeeting.join()
                }).then(res=>{
                    this.total_one = res.data.total_one;
                    this.total_two = res.data.total_two;
                    this.echartsData = res.data;
                });
                break;
            }
            this.getMeetingList();
        },
        getMeetingList(){
            this.api.v1.pc.dashboard.proposal.termcount().then(res=>{
                this.MeetingList = res.data;
            })
        },
    }
}
</script>ghoa

<style lang="less">
.SuggestedMotionStatistics{
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
        .echartsContentView{
            min-height: 400px;
        }
    }
    .header-right-select{
        margin-right: 5px;
        padding-top: 0;
        padding-bottom: 0;
        margin-right: 15px;
        .el-input__inner{
            height: 28px;
        }
        .el-range-input{
            .el-input__inner;
        }
        .el-input__icon{
            line-height: 28px;
        }
        &.type1{
            .el-select__tags{
                width: 400px;
                overflow: hidden;
                height: 28px;
            }
        }
    }
}
</style>