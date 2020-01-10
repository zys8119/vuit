<template>
  <div id="app">
      <top-nav v-if="!$route.meta.isAllPage" />
      <left-nav v-if="!$route.meta.isAllPage" :class="$store.state.menu.leftMenuList.length > 0 && $store.state.menu.currentPathInfo.path.split('/').length > 2 ? '' : 'left-no-menu'"/>
      <div v-if="!$route.meta.isAllPage" class="main-content" :class="$store.state.menu.leftMenuList.length && $store.state.menu.currentPathInfo.path.split('/').length > 2 > 0 ? '' : 'all-main-content'">
          <tabs-nav/>
          <transition mode="out-in">
              <div class="content-content">
                  <router-view/>
              </div>
          </transition>
      </div>
      <transition v-if="$route.meta.isAllPage" mode="out-in">
          <router-view/>
      </transition>
  </div>
</template>

<script>
import LeftNav from "./components/views/Common/LeftNav";
import TopNav from "./components/views/Common/TopNav";
import TabsNav from "./components/views/Common/TabsNav";
export default {
    name: 'app',
    components: {TabsNav, TopNav, LeftNav},
    data() {
        return {
            menu: []
        }
    },
    beforeCreate() {
        if (!sessionStorage.getItem('userInfo')) this.$router.push('/login')
    },
    mounted() {
        window._this = this
        this.menu = this.$router.options.routes
        if (process.env.NODE_ENV === 'development') {
            this.$store.commit('SaveMenu', this.menu)
            this.$store.dispatch('RouterChange')
        } else this.getMenuList()
    },
    methods: {
        // 获取线上菜单
        getMenuList() {}
    }
}
</script>

<style lang="less">
    @import "./assets/style/main";
</style>
