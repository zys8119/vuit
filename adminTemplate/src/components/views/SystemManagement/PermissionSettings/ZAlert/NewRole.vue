<template>
    <div class="NewRole">
        <el-form ref="form" label-width="120px">
            <el-form-item label="角色名称:" prop="title">
                <el-input  v-model="addAgenda.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色描述:" prop="description">
                <el-input v-model="addAgenda.description" placeholder="请输入角色描述"></el-input>
            </el-form-item>
            <el-form-item label="角色类型:" required>
                <el-select v-model="addAgenda.type" placeholder="请选择">
                    <el-option
                        v-for="item in roleTabsSelect"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="code:" required v-if="addAgenda.type === 1">
                <el-input v-model="addAgenda.code" placeholder="请输入code"></el-input>
            </el-form-item>
            <el-form-item label="选择角色登录" required>
                <el-checkbox-group v-model="checkedAuthority">
                    <div v-for="(item,key) in authorities" :key="key" class="el-col-8">
                        <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="角色是否有效" required>
                <el-switch class="z_el_switch" v-model="addAgenda.effect" active-color="#09AF39" :active-text="(addAgenda.value)?'是':'否'"></el-switch>
            </el-form-item>
        </el-form>
        <z-alert-footer>
            <el-button type="primary" @click="save">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "NewRole",
    props:{
        // 角色类型选项
        roleTabsSelect:{
            type:Array,
            default:Array
        },
        // 单位id
        unitId:{
            type:String,
            default: null
        },
        // 是否是管理员
        isAdmin:{
            type:Boolean,
            default: false
        }
    },
    data(){
        return {
            addAgenda:{},
            checkedAuthority:[],
            authorities:[
                {id:1,name:'微信端是否允许登录'},
                {id:2,name:'手机端是否允许登录'},
                {id:3,name:'电脑端是否允许登录'}
            ],
        }
    },
    methods:{
        save(){
            if(this.$utils.is_S(this.addAgenda.name)){
                this.$message.error("请输入角色名称");
                return;
            }
            if(!this.addAgenda.type){
                this.$message.error("请选择角色类型");
                return;
            }
            if(this.isAdmin && this.addAgenda.type === 1){
                if((!this.addAgenda.code || this.addAgenda.code.length === 0)){
                    this.$message.error("请输入code");
                    return;
                }
                if(!/^[A-Za-z0-9]*$/.test(this.addAgenda.code)){
                    this.$message.error("code只允许为字母或数字");
                    return;
                }
            }
            this.addAgenda.login_wx = false;
            this.addAgenda.login_pc = false;
            this.addAgenda.login_app = false;
            this.checkedAuthority.forEach((item) => {
                if(item == 1) {
                    this.addAgenda.login_wx = true;
                }else if (item == 2) {
                    this.addAgenda.login_app = true;
                }else if (item == 3) {
                    this.addAgenda.login_pc = true;
                }
            });
            let url =  '/v2/pc/permission/role/add/';
            if(this.isAdmin){
                // 管理员
                url = `/v2/pc/permission/role/adminAdd/`;
            }
            window.common.Axios({
                url:url,
                method:"post",
                data: {
                    ...this.addAgenda,
                    unit:this.unitId
                },
            }).then(()=>{
                this.$message({type:"success",message:"保存成功"});
                this.$emit("save");
                this.$ZAlert.hideAll();
            })
        }
    }
}
</script>

<style scoped lang="less">
.NewRole{
}
</style>