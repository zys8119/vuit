<template>
    <div class="ZAlertFooter">
        <div class="ZAlertFooterBox" :style="{textAlign:align}">
            <div class="ZAlertFooterBoxContent">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ZAlertFooter",
    props:{
        align:{
            type:String,
            default:"center"
        }
    }
}
</script>

<style scoped lang="less">
.ZAlertFooter{
    height: @unit30*2;
    .ZAlertFooterBox{
        background-color: #ffffff;
        position: absolute;
        left: @unit20;
        bottom: @unit30;
        width: 100%;
        padding-top:@unit30;
        .ZAlertFooterBoxContent{
            padding-right: @unit30 + @unit15;
            .el-button{
                min-width: 120px;
            }
        }
    }
}
</style>