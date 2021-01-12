export default (to, from, next)=>{
    return {
        //todo 文档
        //页面标题
        title:to.name,
        //页面背景
        bodyBaColor:"transparent",
        //转场动画，动画名称，可在fn.less自定义动画
        transitionName:null,

        //todo 头部
        //显示头部
        headerShow:true,
        //头部左右宽度
        span:"80px",
        //是否启用返回isBack
        isBack:true,
        //-------------------------
        //左边宽度，优先
        leftSpan:null,
        //leftText
        leftText:null,
        //leftIcon
        leftIcon:"&#xe646;",
        //leftClick
        leftClick:new Function,
        //leftShow
        leftShow:true,
        //-------------------------
        //头部标题
        content:null,
        //contentIcon
        contentIcon:null,
        //contentClick
        contentClick:new Function,
        //contentShow
        contentShow:true,
        //-------------------------
        //右边宽度，优先
        rightSpan:null,
        //rightText
        rightText:null,
        //rightIcon
        rightIcon:null,
        //rightClick
        rightClick:new Function,
        //rightShow
        rightShow:true,

        //todo 导航
        //导航状态,默认首页
        navKey:"home",
        //显示导航菜单
        footerShow:true,
    }
}