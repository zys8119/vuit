import configs from "../../data/config"
import $utils from "../../utils/index"
const menu = {
    state: {
        currentPathInfo: '',
        menuList: [],
        leftMenuList:[],
        cashLeftMenu: {},
        leftActiveMenuKeys: [],
        navMenuList:[],
        getServeMenuList:configs.MenuMap.switch,
    },
    getters:{
        MenuMap:state =>{
            if(!state.getServeMenuList && process.env.NODE_ENV === 'development'){return configs.MenuMap.dev}
            return configs.MenuMap.buid;
        }
    },
    actions: {
        // 路由变化
        RouterChange(context){
            let currentPathArr = context.state.currentPathInfo.path.split('/')
            let hashUrlOne = '/' + currentPathArr[1]
            context.state.leftActiveMenuKeys = []
            context.state.menuList.map(vItem => {
                let v = $utils.getMenuMap(vItem,this.getters.MenuMap);
                if (v.path === hashUrlOne) {
                    if (v.children) context.state.leftMenuList = v.children
                }
            })
            for (let i = 2; i < currentPathArr.length; i++) {
                let obj = {
                    value: currentPathArr[i],
                    key: i - 2
                }
                context.commit('GetLeftMenuKey', obj)
            }
            context.commit('SetNavMenu')
        }
    },
    mutations: {
        SaveMenu: (state, menu) => {
            state.menuList = menu
        },
        // 页面当前hash路由地址
        SetCurrentPathInfo(state, info){
            state.currentPathInfo = info
        },
        // 获取左侧菜单 激活key
        GetLeftMenuKey(state, obj){
            if (obj.key !== 0) {
                try {
                    state.cashLeftMenu.children.map((vItem, i) => {
                        let v = $utils.getMenuMap(vItem,this.getters.MenuMap);
                        if (v.path === obj.value) {
                            state.leftActiveMenuKeys.push(i)
                            state.cashLeftMenu = v
                        }
                    })
                }catch (e) {
                    //err
                }
            } else {
                state.leftMenuList.map((vItem, i) =>{
                    let v = $utils.getMenuMap(vItem,this.getters.MenuMap);
                    if (v.path === obj.value) {
                        state.leftActiveMenuKeys.push(i)
                        state.cashLeftMenu = v
                    }
                })
            }
        },
        SetLeftMenu:(state, menu) => {
            state.leftMenuList = menu
        },
        SetNavMenu(state) {
            let isNoRepeat = false
            if (state.currentPathInfo.meta.isAllPage) return
            state.navMenuList.map(v => {
                if (v.path === state.currentPathInfo.path) isNoRepeat = true
            })
            if (!isNoRepeat) state.navMenuList.push(state.currentPathInfo)
        },
        DeleteOthersNavMenu(state, currentPath) {
            let obj =  state.navMenuList.find(v => {
                return v.fullPath === currentPath
            })
            state.navMenuList.splice(0, state.navMenuList.length)
            state.navMenuList.push(obj)
        }
    }
}

export default menu
