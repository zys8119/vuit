import {Plugin} from "vue"
const MyPul:Plugin = {
    install:(vue)=>{
        vue.mixin({
            data(){
                return {
                    bbbbb:4545
                }
            }
        })
    }
}
export default MyPul;