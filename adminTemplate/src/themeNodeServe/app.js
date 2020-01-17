const http = require('http');
const less = require('less');
const fs = require('fs');
const path = require('path');
const url = require('url');
let httpServer =  http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url, true)
    res.writeHead(200, {"Content-Type":'text/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'})
    let _res = {
        code: '',
        state: 1,
        data: '',
        message: ''
    }
    if (pathname === '/getcss') {
        if(!query.color){
            _res.code = 1
            _res.message = '请选择颜色'
            res.end(JSON.stringify(_res))
            return
        }
        less.render(fs.readFileSync(path.resolve(__dirname, "./less/nbrd_red_new.less"), {encoding:"utf8"})+`.initTheme(${query.color});`,{})
            .then(({css})=> {
                if(query.type === "file") {
                    res.writeHead(200, {
                        'Access-Control-Allow-Origin': "*",
                        'Access-Control-Allow-Methods':'*',
                        'Access-Control-Allow-Headers':'*',
                        'Content-Type':`text/css; charset=utf-8;`
                    })
                    res.end(css)
                } else {
                    _res.code = 0
                    _res.data = css
                    _res.message = 'success'
                    res.end(JSON.stringify(_res))
                }
            }).catch(()=>{
                _res.code = 1
                _res.message = '主题获取失败'
                res.end(JSON.stringify(_res))
            })
    } else {
        _res.code = 1
        _res.message = '系统繁忙，请稍后再试！'
        res.end(JSON.stringify(_res))
    }
});
const listen = (process.argv.length >= 3)? parseInt(process.argv[3]): false || 3000;
httpServer.listen(listen);
console.log(`【themeServe】App running at: http://localhost:${listen}/`);
