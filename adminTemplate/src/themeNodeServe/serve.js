const { exec } = require('child_process');
exec(`start npm run serve`,(err)=>{
    if(err) return
});
exec(`start node src\\themeNodeServe\\app.js`,(err)=>{
    if(err) return
});
exec(`exit`,(err)=>{
    if(err) return
});
