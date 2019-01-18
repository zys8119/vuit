#!/usr/bin/env node
const command = require("ncommand");
const newCommand = new command();
const Vuit = require("./bin/vuit");
const VuitInit = new Vuit();
newCommand.end(function (){
    this.console
        .color(function () {
            this
                .log(`where`)
                .info(" <command|options> ")
                .log("is one of:");
        })
        .log(`     init -i -v --version -h help`)
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
    .Options({
        log:["-v","查看版本号"],
        output:false,
        callback:function () {
            VuitInit.getVersion(this);
        }
    })
    .Options({
        log:["--version","查看版本号"],
        output:false,
        callback:function () {
            VuitInit.getVersion();
        }
    })
    .init(null,Function);