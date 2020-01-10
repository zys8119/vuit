<template>
    <home-card :title="title"  class="DutyActivityStatistics">
        <div class="active-content">
            <div class="echart-title">
                <div class="left">履职活动数量：<span>{{total}}</span>条</div>
                <div class="right">
                    <el-date-picker
                            v-model="year"
                            value-format="yyyy"
                            format="yyyy"
                            type="year"
                            placeholder="选择年">
                    </el-date-picker>
                    <el-date-picker
                            v-model="month"
                            value-format="MM"
                            format="MM"
                            type="month"
                            placeholder="选择月">
                    </el-date-picker>
                    <el-select v-model="type"  clearable placeholder="请选择">
<!--                        <el-option-->
<!--                                key="2"-->
<!--                                label="测试"-->
<!--                                value="222">-->
<!--                        </el-option>-->
                    </el-select>
                </div>
            </div>
            <echarts :data="echartsData"></echarts>
        </div>
    </home-card>
</template>

<script>
export default {
    name: "DutyActivityStatistics",
    props:{
        title:{
            type:String,
            default:null,
        }
    },
    data() {
        return {
            year:null,
            month:"",
            type:"",
            total:0,
            echartsData:{},
        }
    },
    watch:{
        year() {
            this.init();
        },
        month() {
            this.init();
        },
        type() {
            this.init();
        },
    },
    methods:{
        init(){
            this.api.v1.pc.dashboard.statistics.getActivityInfo({
                year:this.year || new Date().getFullYear(),
                month:this.month,
                type:this.type,
            }).then(res=>{
                this.total = res.data.total;
                this.echartsData = res.data;
            });
        }
    }
}
</script>

<style lang="less">
.DutyActivityStatistics{
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
                .el-date-editor{
                    width: 110px;
                    margin-right: 5px;
                    .el-input__inner{
                        height: 28px;
                    }
                    .el-input__icon{
                        line-height: 28px;
                    }
                }
                .el-select{
                    width: 110px;
                    .el-date-editor;
                }
            }
        }
        .echartsContentView{
            min-height: 300px;
        }
    }
}
</style>