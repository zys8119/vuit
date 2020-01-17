<template>
    <div class="ContentTable">
        <el-pagination  class="el-pagination top" v-if="pagePosition == 'top' && !_currentPagination.noPage"
                        @size-change="_ContentTable_pagination_currentPaginationChange"
                        @current-change="_ContentTable_pagination_currentPaginationChange"
                        :current-page="currentPagination_pageNo"
                        :page-sizes="[_currentPagination.pageSize]"
                        :page-size="_currentPagination.pageSize"
                        :layout="_currentPagination.layout"
                        :total="currentPaginationTotal">
        </el-pagination>
        <el-table
            class="ContentTableObj"
            ref="contentTable_el_table"
            :data="ContentTableData"
            :height="config.height"
            :max-height="config.maxHeight"
            :stripe="config.stripe"
            :border="config.border"
            :size="config.size"
            :fit="config.fit"
            :show-header="config.showHeader"
            :highlight-current-row="config.highlightCurrentRow"
            :current-row-key="config.currentRowKey"
            :row-class-name="config.rowClassName"
            :row-style="config.rowStyle"
            :cell-class-name="config.cellClassName"
            :cell-style="config.cellStyle"
            :header-row-class-name="config.headerRowClassName"
            :header-row-style="config.headerRowStyle"
            :header-cell-style="config.headerCellStyle"
            :row-key="config.rowKey"
            :empty-text="config.emptyText"
            :default-expand-all="config.defaultExpandAll"
            :expand-row-keys="config.expandRowKeys"
            :default-sort="config.defaultSort"
            :tooltip-effect="config.tooltipEffect"
            :show-summary="config.showSummary"
            :sum-text="config.sumText"
            :summary-method="config.summaryMethod"
            :span-method="config.spanMethod"
            :select-on-indeterminate="config.selectOnIndeterminate"
            :indent="config.indent"
            :lazy="config.lazy"
            :load="config.load"
            :tree-props="config.treeProps"
            @select="(...args)=>$emit('select',args[0], args[1])"
            @select-all="(...args)=>$emit('select-all',args[0])"
            @selection-change="(...args)=>$emit('select-all',args[0])"
            @sort-change="(...args)=>$emit('sort-change',args[0])"
            @filter-change="(...args)=>$emit('filter-change',args[0])"
            @cell-mouse-enter="(...args)=>$emit('cell-mouse-enter',args[0],args[1],args[2],args[3])"
            @cell-mouse-leave="(...args)=>$emit('cell-mouse-leave',args[0],args[1],args[2],args[3])"
            @header-dragend="(...args)=>$emit('header-dragend',args[0],args[1],args[2],args[3])"
            @cell-click="(...args)=>$emit('cell-click',args[0],args[1],args[2],args[3])"
            @cell-dblclick="(...args)=>$emit('cell-dblclick',args[0],args[1],args[2],args[3])"
            @row-click="(...args)=>$emit('row-click',args[0],args[1],args[2])"
            @row-contextmenu="(...args)=>$emit('row-contextmenu',args[0],args[1],args[2])"
            @row-dblclick="(...args)=>$emit('row-dblclick',args[0],args[1],args[2])"
            @header-click="(...args)=>$emit('header-click',args[0],args[1],args[2])"
            @header-contextmenu="(...args)=>$emit('header-contextmenu',args[0],args[1],args[2])"
            @current-change="(...args)=>$emit('current-change',args[0],args[1])"
            @expand-change="(...args)=>$emit('expand-change',args[0],args[1])"
        >
            <template v-for="(item,key) in columns">
                <!--复选框-->
                <el-table-column
                    v-if="item.type === 'selection'"
                    :key="key"
                    type="selection"></el-table-column>
                <!--操作-->
                <el-table-column
                    class-name="operate"
                    v-else-if="item.type === 'operate'"
                    :key="key"
                    :width="item.width"
                    :align="item.align || 'center'"
                    :label="item.label">
                    <template v-if="item.btns" slot-scope="scope">
                        <slot name="operate" :scope="scope" :column="item">
                            <z-button @click="(btnItem.emit)? $emit($event.emit,$event,scope.row):fn" :class="`${btnItem.className}`"
                                      v-for="(btnItem,key) in item.btns" :config="btnItem" :key="key + 'operate'"></z-button>
                        </slot>
                    </template>
                </el-table-column>
                <!--文字样式-->
                <el-table-column
                    class-name="textType"
                    v-else-if="item.type === 'textType'"
                    :key="key"
                    :width="item.width"
                    :align="item.align || 'center'"
                    :label="item.label">
                    <template slot-scope="scope">
                        <slot name="textType" :scope="scope" :column="item">
                            <span :class="`${item.textType}`" @click="(item.emit,scope.row)? $emit(item.emit,config):fn">{{scope.row[item.prop] | filter(scope.row,item)}}</span>
                        </slot>
                    </template>
                </el-table-column>
                <!--快捷编辑-->
                <el-table-column
                    class-name="edit"
                    v-else-if="item.type === 'edit'"
                    :key="key"
                    :width="item.width"
                    :align="item.align || 'center'"
                    :label="item.label">
                    <template slot-scope="scope">
                        <slot name="rowEdit" :scope="scope" :column="item">
                            <el-popover
                                placement="bottom"
                                :title="`【${item.label}】快捷修改`"
                                popper-class="contentTable-el-popover"
                                trigger="click" v-model="scope.row['contentTable-el-popover']">
                                <span slot="reference" :class="`${item.textType}`" @click="popoverClick(item,scope.row)">{{scope.row[item.prop] | filter(scope.row,item)}} </span>
                                <i class="el-icon-close" @click="scope.row['contentTable-el-popover'] = !scope.row['contentTable-el-popover']"></i>
                                <el-input placeholder="请输入关键字" v-model="popoverValue"
                                          @change="(item.emit)?$emit(item.emit,popoverValue,scope.row):fn"></el-input>
                                <z-button :config="{name:(item.applyText || '应用')}"
                                          @click="(item.emit)?$emit(item.emit,popoverValue,scope.row):fn"></z-button>
                            </el-popover>
                        </slot>
                    </template>
                </el-table-column>
                <!--选择下拉-->
                <el-table-column
                    class-name="select"
                    v-else-if="item.type === 'select'"
                    :key="key"
                    :width="item.width"
                    :align="item.align || 'center'"
                    :label="item.label">
                    <template slot-scope="scope">
                        <slot name="select" :scope="scope" :column="item">
                            <el-select v-model="scope.row[item.prop]" @change="(item.emit)?$emit(item.emit,$event,scope.row):fn" placeholder="请选择">
                                <el-option
                                    v-for="item in (item.selectData||[])"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </slot>
                    </template>
                </el-table-column>
                <!--切换开关-->
                <el-table-column
                    class-name="switch"
                    v-else-if="item.type === 'switch'"
                    :key="key"
                    :width="item.width"
                    :align="item.align || 'center'"
                    :label="item.label">
                    <template slot-scope="scope" :column="item">
                        <slot name="switch" :scope="scope">
                            <el-switch v-model="scope.row[item.prop]" @change="(item.emit)?$emit(item.emit,$event,scope.row):fn"></el-switch>
                        </slot>
                    </template>
                </el-table-column>
                <el-table-column v-else
                    :key="key"
                    :type="item.type"
                    :index="item.index"
                    :column-key="item.columnKey"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width"
                    :min-width="item.minWidth"
                    :fixed="item.fixed"
                    :render-header="item.renderHeader"
                    :sortable="item.sortable"
                    :sortMethod="item.sortMethod"
                    :sort-by="item.sortBy"
                    :sort-orders="item.sortOrders"
                    :resizable="item.resizable"
                    :formatter="item.formatter"
                    :show-overflow-tooltip="item.showOverflowTooltip"
                    :align="item.align || 'center'"
                    :header-align="item.headerAlign"
                    :class-name="item.className"
                    :label-class-name="item.labelClassName"
                    :selectable="item.selectable"
                    :reserveSelection="item.reserveSelection"
                    :filters="item.filters"
                    :filter-placement="item.filterPlacement"
                    :filter-multiple="item.filterMultiple"
                    :filter-method="item.filterMethod"
                    :filtered-value="item.filteredValue"
                >
                    <template slot="header" slot-scope="scope">
                        <slot :scope="scope" name="header"  v-if="$slots.header" :column="item"></slot>
                        <template v-else>{{scope.column.label}}</template>
                    </template>
                    <template slot-scope="scope">
                        <slot :scope="scope" :column="item">
                            {{scope.row[item.prop] | filter(scope.row,item) }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
            <template slot="empty">
                <slot name="empty"></slot>
            </template>
            <template slot="append">
                <slot name="append"></slot>
            </template>
        </el-table>
        <el-pagination  class="el-pagination bottom" v-if="pagePosition == 'bottom' && !_currentPagination.noPage"
                       @size-change="_ContentTable_pagination_currentPaginationChange"
                       @current-change="_ContentTable_pagination_currentPaginationChange"
                       :current-page="currentPagination_pageNo"
                       :page-sizes="[_currentPagination.pageSize]"
                       :page-size="_currentPagination.pageSize"
                       :layout="_currentPagination.layout"
                       :total="currentPaginationTotal">
        </el-pagination>
    </div>
</template>

<script>
import ZButton from "./ZButton";
import filters from "../../filters";
export default {
    name: "ContentTable",
    components: {ZButton},
    props:{
        config:{
            type:Object,
            default:Object
        },
        data:{
            type:Array,
            default:null
        },
        columns:{
            type:Array,
            default:Array
        },
        pageConfig:{
            type:Object,
            default:Object
        },
        params:{
            type:Object,
            default:null
        },
        url:{
            type:String,
            default:null
        },
        apiPath:{
            type:String,
            default:null
        },
        pagePosition:{
            type:String,
            default:"bottom"
        },
    },
    data(){
        return {
            popoverValue:null,
            selectValue:null,
        }
    },
    filters:{
        filter:function(value,row,item){
            if(item.filter){
                try {
                    return filters[item.filter](value,row,item);
                }catch (e) {
                    console.error(`Failed to resolve filter: ${item.filter}`)
                }
            }
            return value;
        }
    },
    methods:{
        fn(){},
        popoverClick(columns,row){
            if(columns.applyValue){
                this.popoverValue = row[columns.prop];
                return;
            }
            this.popoverValue = null;
        },
    }
}
</script>

<style lang="less">
@import "../../assets/style/less/publicFun";
.ContentTable{
    .ContentTableObj{
        .operate{
            .ZButton{
                &.el-button--text{
                    &:hover{
                        text-decoration: underline;
                    }
                    .colorInit();
                }
            }
        }
        .textType{
            span{
                @color:#409eff;
                &.link{
                    &:hover{
                        text-decoration: underline;
                    }
                    cursor: pointer;
                    color: @color;
                }
                .colorInit();
            }
        }
    }
    .el-pagination{
        &.top{
            margin-bottom: @unit15;
        }
        &.bottom{
            text-align: right;
            margin-top: @unit15;
        }
    }
}
</style>