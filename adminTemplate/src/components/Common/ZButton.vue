<template>
    <el-button class="ZButton"
               :disabled="config.disabled"
               :type="config.type || 'success'"
               :size="config.size"
               :plain="config.plain"
               :round="config.round"
               :circle="config.circle"
               :loading="config.loading"
               :icon="config.icon"
               :autofocus="config.autofocus"
               :native-type="config.nativeType"
               @click="$emit('click',config)">{{config | text}}</el-button>
</template>

<script>
export default {
    name: "ZButton",
    props:{
        config:{
            type:[Object,String],
            default:Object
        },
    },
    filters:{
        text(config){
            if(typeof config === 'string'){
                return config;
            }
            return config.name
        }
    },
}
</script>

<style scoped lang="less">
.ZButton{
}
</style>