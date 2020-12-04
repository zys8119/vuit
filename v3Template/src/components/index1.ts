export interface testbaseOpts {
    a:string
}

export interface testbaseClassConstructor {
    new (opts?:testbaseOpts):void;
    init?():Promise<any>;
}

export interface testbase extends testbaseClassConstructor{}

export class testbase implements testbaseClassConstructor{
    public opts:testbaseOpts;
    init(){
        return new Promise(resolve => {
            resolve("======完成"+this.opts.a);
        })
    }
};