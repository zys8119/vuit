import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"
export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/:pathMatch(.*)*",
            redirect:"/"
        },
        {
            path:"/",
            component:()=>import("./components/HelloWorld.vue")
        },
        {
            path:"/a",
            component:()=>import("./components/AA.vue")
        }
    ]
})