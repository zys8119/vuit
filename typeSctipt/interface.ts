export interface newCommandOptions {
    end?(callback:(this:newCommandOptions)=>any):newCommandOptions;
    Commands?(opts?:newCommandOptions_Commands_opts):newCommandOptions;
    Options?(opts?:newCommandOptions_Commands_opts):newCommandOptions;
    init?(callback?:()=>any,showCallback?:()=>any):newCommandOptions;
    console?:ncolOptions;
}

export interface newCommandOptions_Commands_opts {
    log?:string[];
    output?:boolean;
    callback?(this:newCommandOptions,...args:any[]):void;
}

export interface ncolOptions {
    //颜色方法
    bold?(str?:string):ncolOptions;
    italic?(str?:string):ncolOptions;
    underline?(str?:string):ncolOptions;
    inverse?(str?:string):ncolOptions;
    strikethrough?(str?:string):ncolOptions;
    white?(str?:string):ncolOptions;
    grey?(str?:string):ncolOptions;
    black?(str?:string):ncolOptions;
    blue?(str?:string):ncolOptions;
    cyan?(str?:string):ncolOptions;
    green?(str?:string):ncolOptions;
    magenta?(str?:string):ncolOptions;
    red?(str?:string):ncolOptions;
    yellow?(str?:string):ncolOptions;
    whiteBG?(str?:string):ncolOptions;
    greyBG?(str?:string):ncolOptions;
    blackBG?(str?:string):ncolOptions;
    blueBG?(str?:string):ncolOptions;
    cyanBG?(str?:string):ncolOptions;
    greenBG?(str?:string):ncolOptions;
    magentaBG?(str?:string):ncolOptions;
    redBG?(str?:string):ncolOptions;
    yellowBG?(str?:string):ncolOptions;
    // 常用方法
    log?(opts?:string,type?:string):ncolOptions;
    pub?(opts?:string,type?:string):ncolOptions;
    error?(opts?:string):ncolOptions;
    errorBG?(opts?:string):ncolOptions;
    info?(opts?:string):ncolOptions;
    infoBG?(opts?:string):ncolOptions;
    success?(opts?:string):ncolOptions;
    successBG?(opts?:string):ncolOptions;
    warn?(opts?:string):ncolOptions;
    warnBG?(opts?:string):ncolOptions;
    color?(callback:(this:ncolOptions, ...args:any[])=>any):ncolOptions;
    // 构造方法
    init?(opts:{[key:string]:string}):void;
    extendColor?(opts:{[key:string]:string}):ncolOptions;
}

export interface VuitOptions {
    [key:string]:any;
    projectName?:string;
    templateDirName?:string;
    getVersion?():void;
    init?(_vm?:newCommandOptions,type?:string):void;
    Downloading?(_vm?:newCommandOptions):void;
    copy(src:string,dst:string):void;
    checkDirectory(src:string,dst:string):void;
}