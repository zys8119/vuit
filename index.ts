#!/usr/bin/env node
// import command from "ncommand"
// import Vuit from "./bin/vuit"
import {newCommandOptions} from "./typeSctipt/interface";
declare const require:any;
const command = require("ncommand");
const Vuit = require("./bin/vuit");

const newCommand:newCommandOptions = new command();
const VuitInit = new Vuit();
newCommand.end(function (){
    this.console
        .color(function () {
            this
                .log(`where`)
                .info(" <command|options> ")
                .log("is one of:");
        })
        .log(`     init -i app -a  -v --version -h help`)
})
    .Commands({
        log:["-i","...info('[-i]')","拉取基础模板"],
        output:false,
        callback:function () {
            VuitInit.init(this);
        }
    })
    .Commands({
        log:["init","...info('[-i]')","拉取基础模板"],
        callback:function () {
            VuitInit.init(this);
        }
    })
    .Commands({
        log:["-a","...info('[-a]')","拉取app架构模板"],
        output:false,
        callback:function () {
            VuitInit.init(this,"appTemplate");
        }
    })
    .Commands({
        log:["app","...info('[-a]')","拉取app架构模板"],
        callback:function () {
            VuitInit.init(this,"appTemplate");
        }
    })
    .Commands({
        log:["admin","...info('[-admin]')","拉取admin架构模板"],
        callback:function () {
            VuitInit.init(this,"adminTemplate");
        }
    })
    .Commands({
        log:["-admin","...info('[-admin]')","拉取admin架构模板"],
        output:false,
        callback:function () {
            VuitInit.init(this,"adminTemplate");
        }
    })
    .Options({
        log:["-v","查看版本号"],
        // output:false,
        callback:function () {
            VuitInit.getVersion(this);
        }
    })
    .Options({
        log:["--version","查看版本号"],
        // output:false,
        callback:function () {
            VuitInit.getVersion();
        }
    })
    .init(null,Function);