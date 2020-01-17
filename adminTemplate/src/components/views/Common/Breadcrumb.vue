<template>
    <div class="Breadcrumb">
        <div class="BreadcrumbBox">
            <el-breadcrumb
                :separator="$store.state.layout.Breadcrumb_separator"
                :separator-class="$store.state.layout.Breadcrumb_separatorClass"
                class="ElBreadcrumb">
                <el-breadcrumb-item v-for="(item,key) in list" :key="key" :to="(item.path)?item:null" :replace="item.replace">{{item.lable}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
export default {
    name: "Breadcrumb",
    computed:{
        list(){
            if(this.$store.state.layout.Breadcrumb_default){
                return this.$store.state.menu.currentPathInfo.matched.map(e=>{e.lable = e.name;return e;});
            }
            return this.$store.state.layout.BreadcrumbData;
        }
    }
}
</script>

<style scoped lang="less">
@import "../../../assets/style/less/constant";
.Breadcrumb{
    position: absolute;
    left: 0;
    top: 40px;
    background-color: @themeBackgroundColor;
    width: 100%;
    .BreadcrumbBox{
        padding: 0 15px;
        .ElBreadcrumb{
            line-height: 40px;
        }
    }
}
</style>