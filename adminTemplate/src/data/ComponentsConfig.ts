import { FilterContentConfing, ContentTable_pageConfig } from "./ComponentsInterface";
//todo 过滤器组件
export default <FilterContentConfing>{
    default:{
        input:true,
        placeholder:"请输入关键字",
        search:"search",
        searchText:"搜索",
        reset:"reset",
        resetText:"重置",
        rightBtns:[
            {
                name:'导出',
                emit:"Export",
            },
            {
                name:'新建角色',
                emit:"NewRole",
            },
        ]
    }
}

//todo 表格默认分页参数
export const pageConfig:ContentTable_pageConfig = {
    pageSize:10,
    layout:"total, sizes, prev, pager, next, jumper",
    noPage:false,
    total:0,
};