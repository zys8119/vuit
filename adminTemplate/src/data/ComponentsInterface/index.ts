import {ElButton} from "element-ui/types/button";
import {ElTableColumn} from "element-ui/types/table-column";
import {ElTable} from "element-ui/types/table";

export type ComponentsInterfaceType =  {[key:string]:any};
export type ComponentsInterface$emit = {[key:string]:(...args:any)=>any};
export type ComponentsInterface$slots = {
    default?(...args:any[]):Element;
    [key:string]:(...args:any[])=>Element;
};
export type ComponentsInterfaceMethods = {[key:string]:(...args:any)=>any}
export interface CI<
    props = ComponentsInterfaceType,
    $emit=ComponentsInterface$emit,
    $slots=ComponentsInterface$slots,
    methods=ComponentsInterfaceMethods> {
    // 属性参数
    props:props;
    // 监听事件
    $emit:$emit;
    // 卡槽
    $slots:$slots;
    // 方法
    methods?:methods;
    // [key:string]:any;
}

//todo 【HomeCard.vue】 ==========[start]
export interface HomeCard extends CI{
    props:{
        title?:string; // 标题
        tooltip?:string|boolean; // 提示文字
        icon?:string|boolean; // 图标
        height?:string|boolean; // 高度
    };
    $emit:{
        export?():void;// 导出
    };
    $slots:{
        default?():Element;
        'header-right'?():Element;
    }
}

//todo 【Tree.vue】 ==========[start]
export interface Tree extends CI{
    props:{
        options?:object[]; // 树结构数据
        isTop?:string | true; // 是否为顶级组件
        indent?:number | 20; // 缩进单位
        indentIndex?:number | 0; // 缩进级别
        showNameField?:string | 'name'; // 指定显示字段
        childrenField?:string | 'children'; // 指定显示字段
        keyMap?:string | null; // 节点路径
        nodeHeight?:number | 50; // 节点高度
        parentNode?:object; // 父级节点
        atf?:string | 'ease'; // 动画曲线
        attime?:string | 300; // 动画时间
        checked?:string; // 选中key
        level?:number | 0; // 级别
    },
    $emit:{
        parent(node:TreeNode):void;// 父节点事件
        child(node:TreeNode):void;// 子节点击事件
        node(node:TreeNode):void;// node 点击事件
        checked(keyMap:string):void;// 选中事件
    },
    $slots:{
        default?(data:object,node:TreeNode):Element;
    }
}

export interface TreeNode {
    data:object;// 节点原始数据
    key:number;// 节点key
    keyMap:string;// 节点key的map映射
    node_parent:boolean;// 是否是父级
    node_child:boolean;// 是都为子节点
    node_top:boolean;// 是否为顶部节点
    node_open:boolean;// 节点是否展开
    level:boolean;// 节点级别
    checked:boolean;// 节点是否选中
}

//todo 【FilterContent.vue】 ==========[start]
export interface FilterContent extends CI{
    props:{
        //请参考（ComponentsInterface.ts组件配置---default）
        type?:string;// 类型，
        config?:FilterContentType;// 配置
        value?:any;// input值
    };
    $emit:{
        input?(val?:any):void;// input数据绑定
        [key:string]:()=>void;
    };
    $slots:{
        default?():Element;
        menu?():Element;
        left?():Element;
        right?():Element;
    };
}

export interface FilterContentType {
    [key:string]:any;
    input?:boolean;// input是否显示
    placeholder?:string;// input搜索默认提示
    search?:string;// 搜索按钮的$emit方法
    searchText?:string;// 搜索按钮名称
    reset?:string;// 重置按钮的$emit方法
    resetText?:string;// 重置按钮名称
    rightBtns?:Array<ZButtonConfig>;// 右边按钮集合
}

export type FilterContentConfing = {
    [key:string]:FilterContentType;
}

//todo 【ZButton.vue】 ==========[start]

export interface ZButton extends CI{
    props:{
        config?:ZButtonConfig;
    }
};

export type ZButtonConfig = ZButtonType | ElButton;

export type ZButtonType = {
    name?:string; // 按钮文字
    emit?:string; // 按钮$emit方法
}

//todo 【Echarts.vue】 ==========[start]

export interface Echarts extends CI{
    props:{
        data?:object;// 图表数据
        type?:string | 'line';// 图表类型，如不需要内置类型，可为customize类型，自定义配置
        options?:object;// 图表初始化选项，将会覆盖对应类型配置
        height?:string|boolean;// 图表初始化选项，将会覆盖对应类型配置
    }
};

//todo 【ContentTable.vue】 ==========[start]

export interface ContentTable extends CI{
    props:{
        config?:ContentTableConfig;// 表格配置
        data?:object[];// 表格数据
        columns?:ContentTable_Columns[];// 栏目配置
        pageConfig?:ContentTable_pageConfig;// 分页配置
        params?:{[key:string]:any};// 接口数据，当url|apiPath存在时生效
        url?:string;// 表格数据接口地址
        apiPath?:string;// 表格数据接口api路径地址，该参数存在将优先使用，url参数无效
        pagePosition?:string | 'top' | 'buttom';// 分页位置
    };
    $emit:{
        // 其他请参考【element-ui】原生表格
        pageChange(pageConfig:ContentTableConfig):void;//分页方法
        dataChange(newData:object[]):void;// 抛出最新的表格数据
    }
    $slots:{
        default?(scope:object,column:object):Element;
        header?(scope:object,column:object):Element;
        // 无数据卡槽
        empty?():Element;
        //插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。
        append?():Element;
        textType?(scope:object,column:object):Element;// 文本
        operate?(scope:object,column:object):Element;// 操作
        rowEdit?(scope:object,column:object):Element;// 快捷编辑
        select?(scope:object,column:object):Element;// 下拉
        switch?(scope:object,column:object):Element;// Switch 开关
    },
    methods:{
        init?():void;// 表格初始化，必须执行
    }
};

export interface ContentTable_pageConfig {
    pageSize?:number;// 每页数量
    layout?:string;// 分页布局
    noPage?:boolean;// 是否启用分页，默认启用，设置true为不启用
    total?:number;// 分页总数
}

export type ContentTableConfig = ContentTableConfigType | ElTable;

export type ContentTableConfigType = {

}

export type ContentTable_Columns = ContentTable_ColumnsType | ElTableColumn;

export type ContentTable_ColumnsType = {
    type?:string
        | "selection" | "operate" | "textType" | "edit" | "select" | "switch"; // 栏目类型
    emit?:string; // 文本emit对应方法名称，当type = "operate" | "textType" | "edit" | "change" | "switch" 生效
    /**
     * 对应类型| 对应emit方法暴露的参数
     * type   | $event
     * ==============================
     * operate | $event,row
     * textType | row
     * edit | value,row
     * select | $event,row
     * switch | $event,row
     */
    textType?:ContentTable_ColumnsType_textType;// 文本样式类型,link类型与其他类型可叠加使用
    btns?:ContentTable_ColumnsType_ZButton[];// 操作按钮组，当type = "operate" 生效
    applyValue?:boolean;// 是否回显编辑源数据，默认不回显
    applyText?:string;// 应用按钮文字
    selectData?:object[];// 下拉数据，当type = "select" 生效
    filter?:string;// 要启用的全局过滤器名称,type = "textType" | "edit" | 默认，时生效
}

export type ContentTable_ColumnsType_ZButton = ContentTable_ColumnsType_ZButtonType | ZButton;
export type ContentTable_ColumnsType_ZButtonType = {
    className:ContentTable_ColumnsType_textType;// 按钮文本样式类型,link类型与其他类型可叠加使用
}
export type ContentTable_ColumnsType_textType = string
    | "link" | "default" | "success" | "delete" | "primary"
    | "default_bg" | "success_bg" | "delete_bg" | "primary_bg";

//todo 【ZAlertFooter.vue】 ==========[start]

export interface ZAlertFooter {
    props:{
        align?:string;// 按钮对齐方式，css属性，默认左右居中
    },
    $slots: {
        // 默认卡槽
        default?(scope: object, column: object): Element;
    }
}
