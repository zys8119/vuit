import { testbaseOpts, testbase} from "./index1";
export class test extends testbase implements  testbase{
    opts:testbaseOpts;
    constructor(opts:testbaseOpts) {
        super()
        this.opts = opts;
        this.init().then(res=>{
            console.log(res,opts)
        })
    }
}