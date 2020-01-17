<template>
  <div id="app">
      <top-nav v-if="!$route.meta.isAllPage" />
      <left-nav v-if="!$route.meta.isAllPage" :class="$store.state.menu.leftMenuList.length > 0 && $store.state.menu.currentPathInfo.path.split('/').length > 2 ? '' : 'left-no-menu'"/>
      <div v-if="!$route.meta.isAllPage" class="main-content" :class="$store.state.menu.leftMenuList.length && $store.state.menu.currentPathInfo.path.split('/').length > 2 > 0 ? '' : 'all-main-content'">
          <tabs-nav/>
          <breadcrumb v-if="($store.state.layout.Breadcrumb
          && ($store.state.layout.BreadcrumbData.length !== 0  || $store.state.layout.Breadcrumb_default) )"></breadcrumb>
          <transition mode="out-in">
              <div class="content-content" id="mainViewContent"
                   :class="{CC_Breadcrumb:($store.state.layout.Breadcrumb &&
                   ($store.state.layout.BreadcrumbData.length !== 0 || $store.state.layout.Breadcrumb_default))}">
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
import Breadcrumb from "./components/views/Common/Breadcrumb";
export default {
    name: 'app',
    components: { TabsNav, TopNav, LeftNav, Breadcrumb },
    data() {
        return {
            menu: [],
        }
    },
    beforeCreate() {
        if (!sessionStorage.getItem('userInfo')) this.$router.push('/login')
    },
    mounted() {
        this.setTheme();
        window._this = this;
        this.menu = this.$router.options.routes
        if (!this.$store.state.menu.getServeMenuList && process.env.NODE_ENV === 'development') {
            this.setStore({
                menus:this.menu
            })
        } else this.getMenuList();
    },
    methods: {
        // 写入数据
        setStore({menus}){
            // 渲染菜单权限
            this.$store.commit('SaveMenu',menus)
            // 渲染当前路菜单状态
            this.$store.dispatch('RouterChange')
        },
        // 获取线上菜单
        getMenuList() {
            this.api.v1.auth.selfMenuAndRole().then(res=>{
                this.setStore(res.data);
            })
        },
        // 设置本地主题色
        setTheme(){
            if(!localStorage.themeColor){return;}
            this.api.otherApi.setTheme(localStorage.themeColor).then((res) => {
                this.$utils.setTheme(localStorage.themeColor,res.data);
                this.$ZAlert.hide();
            });
        }
    }
}
</script>

<style lang="less">
    @import "./assets/style/main";
</style>
