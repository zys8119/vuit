var packageJson = require("../package.json");
var ncol = require("ncol");
var command = require("ncommand");
var newCommand = new command();
var fs = require("fs");
var path = require("path");
var Vuit = /** @class */ (function () {
    function Vuit() {
        this.projectName = null;
    }
    //获取版本
    Vuit.prototype.getVersion = function () {
        console.log("v" + packageJson.version);
    };
    //拉取基础模板
    Vuit.prototype.init = function (_vm, type) {
        this.projectName = _vm.argv[1] || "vuit";
        this.templateDirName = type || "template";
        if (this.projectName == "-h") {
            newCommand
                .Commands({
                log: ["-h", "帮助"],
                callback: function () {
                    ncol
                        .color(function () {
                        this
                            .log("where")
                            .info(" <projectName>")
                            .log(" 项目名称");
                    });
                }
            }).init(null, Function);
        }
        this.Downloading(_vm);
    };
    //下载模板
    Vuit.prototype.Downloading = function (_vm) {
        ncol.info("Downloading templates ...");
        this.checkDirectory(path.resolve(__dirname, '../', this.templateDirName), path.resolve(process.cwd(), './' + this.projectName));
        ncol.green("Download done");
    };
    //文件拷贝
    Vuit.prototype.copy = function (src, dst) {
        var _this = this;
        var paths = fs.readdirSync(src); //同步读取当前目录
        paths.forEach(function (path) {
            var _src = src + '/' + path;
            var _dst = dst + '/' + path;
            if (fs.statSync(_src).isDirectory()) {
                _this.checkDirectory(_src, _dst);
            }
            else {
                var docs = fs.readFileSync(_src, "utf8");
                if (path == "package.json") {
                    docs = JSON.parse(docs);
                    docs.name = _this.projectName;
                    docs = JSON.stringify(docs, null, 4);
                }
                if (path == "index.html") {
                    docs = docs.replace("模板基础", _this.projectName);
                }
                fs.writeFileSync(_dst, docs);
            }
            ;
        });
    };
    //检测目录
    Vuit.prototype.checkDirectory = function (src, dst) {
        try {
            fs.accessSync(dst, fs.constants.F_OK);
            this.copy(src, dst);
        }
        catch (err) {
            fs.mkdirSync(dst);
            this.copy(src, dst);
        }
    };
    return Vuit;
}());
module.exports = Vuit;
