const packageJson = require("../package.json");
const ncol = require("ncol");
const command = require("ncommand");
const newCommand = new command();
const fs = require("fs");
const path = require("path");
class Vuit {
    constructor(){
        this.projectName = null;
    }

    //获取版本
    getVersion(){
        console.log("v"+packageJson.version);
    }

    //拉取基础模板
    init(_vm,type){
        this.projectName = _vm.argv[1] || "vuit";
        this.templateDirName = type || "template";
        if(this.projectName == "-h"){
            newCommand
                .Commands({
                    log:["-h","帮助"],
                    callback:function () {
                        ncol
                            .color(function () {
                                this
                                    .log(`where`)
                                    .info(" <projectName>")
                                    .log(" 项目名称")
                            });
                    }
                }).init(null,Function);
        }
        this.Downloading(_vm);
    }

    //下载模板
    Downloading(){
        ncol.info("Downloading templates ...");
        this.checkDirectory(path.resolve(__dirname, '../',this.templateDirName),path.resolve(process.cwd(), './'+this.projectName));
        ncol.green("Download done");
    }

    //文件拷贝
    copy(src,dst){
        let paths = fs.readdirSync(src); //同步读取当前目录
        paths.forEach((path)=>{
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            if(fs.statSync(_src).isDirectory()){
                this.checkDirectory(_src,_dst);
            }else {
                let docs = fs.readFileSync(_src,"utf8");
                if(path == "package.json"){
                    docs = JSON.parse(docs);
                    docs.name = this.projectName;
                    docs = JSON.stringify(docs,null,4);
                }
                if(path == "index.html"){
                    docs = docs.replace("模板基础",this.projectName);
                }
                fs.writeFileSync(_dst, docs);
            };
        });
    }

    //检测目录
    checkDirectory(src,dst){
        try {
            fs.accessSync(dst, fs.constants.F_OK);
            this.copy(src,dst);
        } catch (err) {
            fs.mkdirSync(dst);
            this.copy(src,dst);
        }
    }
}
module.exports = Vuit;