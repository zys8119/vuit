<template>
    <div class="Layout">
        <layout-header v-if="airforce.layout.headerShow"></layout-header>
        <transition :name="airforce.layout.transitionName">
            <router-view class="Layout-view" />
        </transition>
        <layout-footer v-if="airforce.layout.footerShow"></layout-footer>
    </div>
</template>

<script>
    import LayoutFooter from "./LayoutFooter"
    import LayoutHeader from "./LayoutHeader"
    export default {
        name: "layout",
        components:{ LayoutFooter, LayoutHeader }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/vars";
    @import "../../assets/less/fn";
    .Layout {
        .Layout-view{
            position: fixed;
            left: 0;
            top: @HeaderHeight;
            z-index: 1;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            .calcHeigth(568,@HeaderHeight+@FooterHeight);
            .calcHeigth(667,@HeaderHeight+@FooterHeight);
            .calcHeigth(736,@HeaderHeight+@FooterHeight);
            .calcHeigth(812,@HeaderHeight+@FooterHeight);
            .calcHeigth(936,@HeaderHeight+@FooterHeight);
            .calcHeigth(1024,@HeaderHeight+@FooterHeight);
            height: ~"calc( 100% - @{HeaderHeight} - @{FooterHeight})" !important;
        }
    }
</style>