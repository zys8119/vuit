<template>
    <home-card :title="title"  class="RepresentativeStatistics">
        <el-row :gutter="10">
            <el-col :span="16">
                <div class="echart-title">
                    <div class="left">{{all_person.title}}：<span>{{all_person.total}}</span>条</div>
                    <div class="right">
                        <el-select v-model="select">
                            <el-option :label="item.name" :value="item.id" v-for="(item,key) in selectList" :key="key"></el-option>
                        </el-select>
                    </div>
                </div>
                <echarts height="500px" type="cylinder_type" :data="all_person"></echarts>
            </el-col>
            <el-col :span="8" class="echarts_pie">
                <div class="echart-title">
                    <div class="left">{{change_person.title}}</div>
                </div>
                <echarts height="500px" type="pie" :data="change_person"></echarts>
                <p class="content-div-body-out-num">共 <span>{{change_person.total}}</span> 人</p>
            </el-col>
        </el-row>
        <el-row :gutter="0">
            <el-col :span="8" class="echarts_pie">
                <div class="echart-title">
                    <div class="left">{{party_person.title}}</div>
                </div>
                <echarts height="500px" type="pie_party" :data="party_person"></echarts>
            </el-col>
            <el-col :span="8" class="echarts_pie">
                <div class="echart-title">
                    <div class="left">{{gender_person.title}}</div>
                </div>
                <echarts height="500px" type="pie_gender" :data="gender_person"></echarts>
                <p class="content-div-body-out-num">共 <span>{{gender_person.total}}</span> 人</p>
            </el-col>
            <el-col :span="8" class="echarts_pie">
                <div class="echart-title">
                    <div class="left">{{education_person.title}}</div>
                </div>
                <echarts height="500px" type="pie_education" :data="education_person"></echarts>
                <p class="content-div-body-out-num">共 <span>{{education_person.total}}</span> 人</p>
            </el-col>
        </el-row>
    </home-card>
</template>

<script>
export default {
    name: "RepresentativeStatistics",
    props:{
        title:{
            type:String,
            default:null,
        }
    },
    data(){
        return {
            selectList:[],
            select:"",
            total:0,
            echartsData:{},
        }
    },
    computed:{
        all_person(){return this.echartsData.all_person || {total:0};},
        change_person(){return this.echartsData.change_person || {};},
        gender_person(){return this.echartsData.gender_person || {};},
        education_person(){return this.echartsData.education_person || {};},
        party_person(){return this.echartsData.party_person || {};},
    },
    watch:{
        select(){
            this.getSelectData();
        }
    },
    methods:{
        init(){
            this.api.v1.pc.common.term.history().then(res=>{
                this.selectList = res.data;
                try {
                    this.select = res.data[0].id;
                }catch (e) {
                    // err
                }
            });
        },
        getSelectData(){
            this.api.v1.pc.dashboard.user.rddb({
                term_count:this.select,
            }).then(res=>{
                this.echartsData = res.data;
            });
        }
    }
}
</script>

<style scoped lang="less">
.RepresentativeStatistics{
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
                .el-date-editor;
                width: 200px;
            }
        }
    }
    .echarts_pie{
        position: relative;
        .content-div-body-out-num{
            position: absolute;
            top: 50%;
            top: ~"calc(50% + 28px)";
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 16px;
            line-height: 30px;
            span{
                font-size: 24px;
                line-height: 30px;
                color: #BC0000;
            }
        }
    }

}
</style>