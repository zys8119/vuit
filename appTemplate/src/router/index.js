import Vue from 'vue'
import Router from 'vue-router'
import importVue from "import-vue"

Vue.use(Router);
const bodyBaColor = "#fbf9fe";

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
      importVue({
          name:"Layout/Layout",
          redirect:"/",
          children:[
              importVue("Home/Home","/","首页",{meta:{bodyBaColor:bodyBaColor,leftShow:false,transitionName:"fadeIn"}}),
              importVue("HelloWorld/HelloWorld","/HelloWorld","欢迎使用vue",{meta:{navKey:"good",transitionName:"bounceInUp"}}),
              importVue("Vux/Vux","/Vux","欢迎使用Vux",{meta:{navKey:"shop",transitionName:"fadeIn"}}),
          ]
      })
  ]
})
