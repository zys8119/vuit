<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" class="Index"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="Index"/>
    </div>
</template>

<script>
export default {
    name: 'Index'
}
</script>

<style>
</style>
