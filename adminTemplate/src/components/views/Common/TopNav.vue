<template>
    <div id="topNav">
        <div class="nav-top">
            <img :src="img" alt="">
        </div>
        <div class="nav-bottom">
            <div class="left">
                <img :src="logo" alt="">
            </div>
            <div class="center">
                <ul id="topNavUl">
                    <!--eslint-disable-next-line vue/no-use-v-if-with-v-for-->
                    <li v-if="!item.meta || (item.meta && !item.meta.isAllPage)" v-for="(item, key) in menu" :key="key" :class="item.path === routerOne ? 'active' : ''" @click="goLink(item)">
                        <span v-text="item.name"></span>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="list">
                    {{loginName}}，您好！
                    <el-dropdown>
                        <span class="el-icon-arrow-down"></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item class="t-a-c">修改密码</el-dropdown-item>
                            <el-dropdown-item class="t-a-c" @click.native="switchThemeColor">切换主题色</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="list" @click="layoutBtn">
                    退出
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "topNav",
    data() {
        return {
            img: './images/common/top-banner.png',
            logo: './images/common/logo.png'
        }
    },
    computed: {
        // 获取头部菜单
        menu() {
            return this.$store.state.menu.menuList
        },
        // 获取路由 第一级
        routerOne() {
            return '/' + this.$route.path.split('/')[1]
        },
        // 登录名
        loginName() {
            if(sessionStorage.getItem('userInfo')){
                return JSON.parse(sessionStorage.getItem('userInfo')).name
            }
            return "";
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.$utils.setHorizontalScroll('topNavUl')
        })
    },
    methods: {
        // 点击头部导航
        goLink(rowItem) {
            let row = this.$utils.getMenuMap(rowItem,this.$store.getters.MenuMap);
            let self = this
            let path = '/' + this.$store.state.menu.currentPathInfo.path.split('/')[1]
            if (path !== row.path) {
                let children = row.children || [];
                self.$router.push(row.path)
                self.$store.commit("SetLeftMenu",children)
                // 是否左侧菜单 实现手风琴效果 一次只能展开一组
                // self.$store.dispatch('RouterChange')
            }
        },
        // 退出登录
        layoutBtn() {
            this.$confirm('是否退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token')
                this.$router.push('/login')
            })
        },
        // 切换主题
        switchThemeColor(){
            this.$ZAlert.show({
                title:"切换主题色",
                width:"400px",
                components:"components/views/Common/SwitchThemeColor"
            });
        }
    }
}
</script>

<style scoped>

</style>
