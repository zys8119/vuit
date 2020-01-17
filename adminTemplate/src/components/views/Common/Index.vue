<template>
    <div>
        <keep-alive>
            <router-view class="Index" v-if="$store.state.layout.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$store.state.layout.keepAlive" class="Index"/>
    </div>
</template>

<script>
export default {
    name: 'Index'
}
</script>

<style>
</style>
