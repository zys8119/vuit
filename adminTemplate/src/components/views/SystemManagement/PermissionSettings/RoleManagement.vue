<template>
    <div class="RoleManagement">
        <layout-left-content asideTitle="角色管理" mainTitle="单位">
            <AsideTree class="AsideTree" slot="aside" :options="treeOptions" @node="clickNode"></AsideTree>
            <layout-filter-content class="RoleManagementContent">
                <template slot="header">
                    <el-button type="success" v-for="(item,key) in roleTabs"
                               :plain="params.type !== item.value"
                               @click="setType(item.value)"
                               :key="key">{{item.name}}</el-button>
                </template>
                <filter-content v-model="params.search" slot="filter"
                                :config="{placeholder:'角色名称/角色描述'}"
                                @search="search"
                                @reset="reset(),search(params.search)"
                                @Export="Export"
                                @NewRole="NewRole"
                ></filter-content>
                <content-table
                    ref="table"
                    apiPath="v2.pc.permission.role.list"
                    :columns="columns"
                    :params="params"
                    :pageConfig="pageConfig"
                >
                    <template slot-scope="{scope,column}">
                        <!--操作-->
                        <template v-if="column.prop === 'operate'">
                            <div class="operate">
                                <z-button @click="(btnItem.emit)? $emit($event.emit,$event,scope.row):fn"
                                          :class="`${btnItem.className}`"
                                          v-for="(btnItem,key) in column.btns"
                                          v-if="isAdmin || scope.row.type === 3 || btnItem.show"
                                          :config="btnItem" :key="key + 'operate'"></z-button>
                            </div>
                        </template>
                        <!--创建时间-->
                        <template v-else-if="column.prop === 'datetime_created'">
                            <el-tooltip class="item" effect="dark" placement="top">
                                <div slot="content">
                                    创建人：{{scope.row.creator_name}}
                                    <br/>
                                    <br/>
                                    创建时间：{{scope.row.datetime_created}}
                                    <br/>
                                </div>
                                <span>{{scope.row.datetime_created}}</span>
                            </el-tooltip>
                        </template>
                        <template v-else>{{scope.row[column.prop]}}</template>
                    </template>
                </content-table>
            </layout-filter-content>
        </layout-left-content>
    </div>
</template>

<script>

export default {
    name: "RoleManagement",
    data(){
        return {
            treeOptions:[],
            columns:[
                {type:"selection",width:"55"},
                {label:"角色名称",prop:"name"},
                {label:"角色描述",prop:"description"},
                {label:"角色类型",prop:"type_str"},
                {label:"创建时间",prop:"datetime_created"},
                {label:"操作", prop:"operate", width:"250px",btns:[
                    {name:"修改", type:'text',className:"default"},
                    {name:"权限设置", type:'text',className:"success"},
                    {name:"绑定人员", type:'text',show:true},
                    {name:"删除", type:'text',className:"delete"},
                ]},
            ],
            roleTabs:[
                {name:"自定义角色",value:3},
                {name:"应用角色",value:2},
                {name:"默认角色",value:1},
            ],
            ndoe:{},
            isAdmin:false,
            params:{
                search:"",
                type:"",
                target_unit:"",
            },
            pageConfig:{
                total:1000
            }
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        fn(){},
        init(){
            this.getIsAmin();
            this.getDataList();
        },
        // 获取管理员权限
        getIsAmin(){
            this.api.v2.pc.permission.role.superAdminCheck().then(res=>{
                this.isAdmin = res.data.result;
            })
        },
        //获取单位树数据
        getDataList() {
            this.unit = window.sessionStorage.getItem('unit')
            this.api.v1.pc.common.organize.listUnit().then((res) => {
                this.treeOptions = [res.data];
                this.clickNode({data:res.data.children[0]});
            })
        },
        //点击左侧筛选列表
        clickNode(node) {
            let item = node.data;
            if(item.type == 20) {
                this.reset();
                this.params.target_unit = item.id;
                this.ndoe = item;
                this.search();
            }
        },
        reset(){
            this.params = {
                search:"",
                type:"",
                target_unit:"",
            };
        },
        setType(type){
            this.params.type = type;
            this.search(this.params.search);
        },
        search(val){
            this.params.search = val || "";
            // 初始化表格
            this.$refs.table.init();
        },
        Export(item){
            console.log(item)
        },
        NewRole(){
            this.$ZAlert.show({
                title:"新增角色",
                width:"700px",
                props:{
                    roleTabsSelect:()=>this.roleTabs,
                    unitId:this.ndoe.id,
                    isAdmin:this.isAdmin,
                },
                _event:{
                    save:()=>{
                        this.reset();
                        this.search(this.params.search);
                    }
                },
                components:"components/views/SystemManagement/PermissionSettings/ZAlert/NewRole"
            })
        }
    }
}
</script>

<style scoped lang="less">
.RoleManagement{
    .RoleManagementContent{
        padding: 0;
        &/deep/ .el-container{
            .LayoutLeftContent-el-main{
                padding-left: 0;
            }
        }
    }
}
</style>