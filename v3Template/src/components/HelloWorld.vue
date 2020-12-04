<template>
    <div class="HelloWorld">
        <h1>{{ $store.state.am.bb }}</h1>
        <h1>{{ $store.state.a }}</h1>
        <button @click="$store.commit('a')">count is: {{ $store.state.a }}</button>
        <el-button type="primary">asd</el-button>
    </div>
</template>

<script lang="ts">
import _ from "lodash";

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    mounted() {
        console.log(this)
    }
}
</script>

<style scoped lang="less">
.HelloWorld{
    h1{
        color: #f00;
        background-color: yellow;
    }
}
</style>
