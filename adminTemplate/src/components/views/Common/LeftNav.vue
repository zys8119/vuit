<template>
    <div id="leftNav" :style="leftNavStyle">
        <tree ref="tree"
              :showNameField="$store.getters.MenuMap.name"
              :childrenField="$store.getters.MenuMap.children"
              :options="option" :checked="defaultKeys" class="z_tree" @child="child">
            <template slot-scope="{node, data}">
                <div class="z_tree_item">
                    <!--<i :class="data.icon" class="z_tree_item_icon"></i>-->
                    {{data.name}}
                    <div v-if="node.node_parent" class="arrowsIcon">
                        <span v-if="node.node_open" class="arrows down"></span>
                        <span v-else class="arrows up"></span>
                    </div>
                </div>
            </template>
        </tree>
    </div>
</template>

<script>
export default {
    name: "leftNav",
    data() {
        return {
            leftNavStyle: {
                background: 'url(./images/common/menu-left-bg.png) no-repeat',
                backgroundSize: '100% 100%'
            }
        }
    },
    computed: {
        option() {
            let leftMenu = JSON.parse(JSON.stringify(this.$store.state.menu.leftMenuList))
            let activeMenuKeys = this.$store.state.menu.leftActiveMenuKeys
            let cashMenu = null
            if (activeMenuKeys.length > 1) {
                for (let i = 0; i < activeMenuKeys.length - 1; i++) {
                    if (cashMenu) {
                        cashMenu.children[activeMenuKeys[i]].node_open = true
                        cashMenu = cashMenu.children[activeMenuKeys[i]]
                    } else {
                        leftMenu[activeMenuKeys[i]].node_open = true
                        cashMenu = leftMenu[activeMenuKeys[i]]
                    }
                }
            }
            return leftMenu
        },
        defaultKeys() {
            return this.$store.state.menu.leftActiveMenuKeys.join(',')
        }
    },
    watch: {
        option() {
            if(this.$refs.tree && this.$refs.tree.checkedMap) this.$refs.tree.checkedMap = null
        }
    },
    methods: {
        child(node) {
            let self = this
            let keyArr = node.keyMap.split(',')
            let cashMenu = null
            node.allPath = '/' + this.$route.path.split('/')[1]
            keyArr.map(v => {
                if (cashMenu) {
                    let selfCashMenuChildren = this.$utils.getMenuMap(cashMenu.children[v],this.$store.getters.MenuMap)
                    node.allPath = node.allPath + '/' + selfCashMenuChildren.path
                    if (cashMenu.children) cashMenu = selfCashMenuChildren
                } else {
                    let selfOption = this.$utils.getMenuMap(self.option[v],this.$store.getters.MenuMap)
                    node.allPath = node.allPath + '/' + selfOption.path
                    cashMenu = selfOption
                }
            })
            this.$router.push(node.allPath)
            // this.$store.commit("SetNavMenu",node)
        }
    }
}
</script>

<style lang="less">
    #leftNav{
        overflow: auto;

    }
</style>
