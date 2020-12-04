declare module "lodash" {
    namespace lodash {
        interface lodashInterface{
            [key:string]:any;
            set?<T>(object:T, path:Array<any>|string, value:any):T;
            merge?<T1,T2>(object:T1, sources:T2):T1 & T2;
        }
    }
    const lodash:lodash.lodashInterface;
    export = lodash;
}