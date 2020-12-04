import { Store } from "vuex"
export default new Store({
    state:{
        a:1
    },
    mutations:{
        a:state => {
            state.a += 1;
        }
    },
    modules:{
        am:{
            state:{
                bb:454
            }
        }
    }
})