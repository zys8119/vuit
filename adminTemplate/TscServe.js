const { exec } = require('child_process');
const fs = require('fs');
const tscServe =  function(config){
    this.config = Object.assign({
        ignores:[],
        tsc:true,
        options:"-m es2015 --moduleResolution Node",
        callback:new Function(),
    },config);
};
var execTsc = (fileName, filePath, Options)=>{
    exec(`tsc ${filePath} ${Options}`,()=>{console.log(fileName);});
};
var watchFile = function(dir) {
    var files = fs.readdirSync(dir);
    files.filter(fileName=>this.config.ignores.indexOf(fileName) === -1).forEach(fileName=>{
        let filePath = dir + '\\' + fileName;
        if (fs.statSync(filePath).isDirectory() === true) {
            watchFile.call(this,filePath);
        }else {
            this.config.callback(fileName,filePath);
            if(!this.config.tsc){return;}
            if(/\.ts$/.test(fileName,filePath)){
                if(!fs.existsSync(filePath.replace(/\.ts$/,".js"))){
                    execTsc(fileName,filePath,this.config.options);
                }
                (function (fileName,filePath,Options) {
                    fs.watch(filePath, ()=> {
                        execTsc(fileName,filePath,Options);
                    });
                })(fileName,filePath,this.config.options);
            }
        }
    });
};


tscServe.prototype.apply = function(){
    if(!this.config.directory){
        throw new Error("directory does not exist in configuration");
    }
    if(Object.prototype.toString.call(this.config.ignores) !== "[object Array]"){
        throw new Error("ignores field should be an array");
    }
    if(Object.prototype.toString.call(this.config.callback) !== "[object Function]"){
        throw new Error("ignores field should be an function");
    }
    watchFile.call(this,this.config.directory);
};
module.exports = tscServe;