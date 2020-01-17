<template>
    <div id="tabsNav">
        <div class="nav-content">
            <div class="content">
                <ul id="navContentUl">
                    <li v-for="(item, key) in navList" :key="key" :class="item.path === $route.path ? 'active' : ''">
                        <div class="con">
                            <span class="name" v-text="item.name" @click="clickTab(item)"></span>
                            <span class="el-icon-close" @click="removeTab(key, item.path === $route.path)"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="nav-arrow">
            <el-dropdown trigger="click">
                <span class="el-icon-s-operation"></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.stop.native="refreshCurrent" class="t-a-c">刷新当前</el-dropdown-item>
                    <el-dropdown-item @click.stop.native="closeAllTabs" class="t-a-c">除此之外关闭全部</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: "tabsNav",
    data() {
        return {
            navList: ''
        }
    },
    mounted() {
        this.navList = this.$store.state.menu.navMenuList
        this.$nextTick(function () {
            this.$utils.setHorizontalScroll('navContentUl')
        })
    },
    methods: {
        removeTab(k, type) {
            let self = this
            let len = this.navList.length
            if (len < 2) return
            if (type) {
                let lastObj = self.navList[len - 2]
                if (lastObj) self.$router.push(lastObj.path)
                else self.$router.push('/')
            }
            this.navList.splice(k, 1)
        },
        clickTab(row){
            this.$router.push(row.path)
        },
        getRef(vm,$refsKeyName,$parent){
            let resultVm = vm.$refs[$refsKeyName];
            if($parent && resultVm && vm.$refs[$refsKeyName].$parent){
                resultVm = vm.$refs[$refsKeyName].$parent;
            }
            if(vm.$children && vm.$children.length){
                for (let i = 0, lng = vm.$children.length; i < lng; i++){
                    let resultVmC = this.getRef(vm.$children[i],$refsKeyName,$parent);
                    if(resultVmC){
                        resultVm = resultVmC;
                        break;
                    }
                }
            }
            return resultVm;
        },
        // 刷新当前
        refreshCurrent() {
            let currentComponent = this.$route.matched[this.$route.matched.length - 1].instances.default
            if (currentComponent && typeof currentComponent.init === "function") currentComponent.init()
            // 刷新表格
            let contentTable_el_table = this.getRef(currentComponent,"contentTable_el_table",true);
            if (contentTable_el_table && typeof contentTable_el_table.init === "function") contentTable_el_table.init()
        },
        // 关闭所有
        closeAllTabs() {
            this.$store.commit('DeleteOthersNavMenu', this.$route.path)
        }
    }
}
</script>

<style scoped lang="less">
    .tabsNav {
        height: 50px;
        border: 1px solid red;
    }
</style>
