<template>
    <div class="SwitchThemeColor">
        <p class="title">主题色</p>
        <el-color-picker class="el-color-picker" v-model="themeColor"></el-color-picker>
        <div class="btns">
            <el-button @click="$ZAlert.hide()">取消</el-button>
            <el-button @click="saveTheme(themeColor)"  type="primary">确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SwitchThemeColor",
    data(){
        return {
            themeColor:null
        }
    },
    mounted() {
        this.themeColor = localStorage.themeColor;
    },
    methods:{
        //获取主题色
        saveTheme(color){
            if(!color){
                // 清除本地主题
                let lessThemeEl = document.getElementById("lessTheme");
                if(lessThemeEl){lessThemeEl.remove()}
                delete localStorage.themeColor;
                this.$ZAlert.hide();
                this.$message({type:"success",message:"重置成功"});
                return;
            }
            this.api.otherApi.setTheme(color).then((res) => {
                this.$utils.setTheme(color,res.data);
                this.$ZAlert.hide();
                this.$message({type:"success",message:"设置成功"});
            });
        }
    }
}
</script>

<style scoped lang="less">
.SwitchThemeColor{
    text-align: center;
    .title{
        font-weight: bold;
        margin-bottom: 15px;
    }
    .btns{
        margin-top: 40px;
    }
    .el-color-picker{
    }
}
</style>