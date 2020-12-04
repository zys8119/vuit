import {appConfigOptions} from "../api/Interface";

export default <appConfigOptions>{
    MenuMap:{
        switch:false,
        buid:{
            path:"route",
            children:"list",
            name:"name",
        },
        dev:{
            path:"path",
            children:"children",
            name:"name",
        }
    }
}