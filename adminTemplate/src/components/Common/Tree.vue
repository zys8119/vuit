<template>
    <div class="Tree" :class="{isTop:isTop}">
        <div  class="node_row" :style="{
            height: clacHeight(item)*nodeHeight + 'px',
            transition:`height ${atf} ${attime}ms`,
        }" v-for="(item, key) in currentOptions" :key="key">
            <div class="node" :style="{
            paddingLeft:paddingLeft,
            height:nodeHeight+'px',
            lineHeight:nodeHeight+'px',
            }" :class="{
                node_parent:!!item[childrenField],
                node_child:!item[childrenField],
                node_top:(isTop && key === 0),
                checked:checkedMap === ((keyMap)?`${keyMap},${key}`:`${key}`),
            }" @click="toggleClick(item, key,{
                data:item,
                key:key,
                keyMap:(keyMap)?`${keyMap},${key}`:`${key}`,
                node_parent:!!item[childrenField],
                node_child:!item[childrenField],
                node_top:(isTop && key === 0),
                node_open:!item.node_open,
                level:level,
                checked:checkedMap === ((keyMap)?`${keyMap},${key}`:`${key}`),
            })">
                <slot :data="item" :node="{
                data:item,
                key:key,
                keyMap:(keyMap)?`${keyMap},${key}`:`${key}`,
                node_parent:!!item[childrenField],
                node_child:!item[childrenField],
                node_top:(isTop && key === 0),
                node_open:!item.node_open,
                level:level,
                checked:checkedMap === ((keyMap)?`${keyMap},${key}`:`${key}`),
            }">{{item[showNameField]}}</slot>
            </div>
            <z-tree v-if="item[childrenField]"
                    :options="item[childrenField]"
                    :isTop="false"
                    :indentIndex="indentIndex+1"
                    :showNameField="showNameField"
                    :keyMap="(keyMap)?`${keyMap},${key}`:`${key}`"
                    :parentNode="item"
                    :atf="atf"
                    :attime="attime"
                    @parent="emitParent"
                    @child="emitChild"
                    @node="emitNode"
                    @checked="emitChecked"
                    :checked="checkedMap"
                    :level= "level + 1"
            >
                <template slot-scope="{node, data}">
                    <slot :node="node" :data="data">{{node[showNameField]}}</slot>
                </template>
            </z-tree>
        </div>
    </div>
</template>

<script>
export default {
    name: "z-tree",
    props:{
        // 树结构数据
        options: {
            type: Array,
            default: Array
        },
        // 是否为顶级组件
        isTop: {
            type: Boolean,
            default: true
        },
        // 缩进单位
        indent: {
            type: Number,
            default: 20
        },
        // 缩进级别
        indentIndex: {
            type: Number,
            default: 0
        },
        // 指定显示字段
        showNameField: {
            type: String,
            default: "name"
        },
        // 指定子节点父级字段
        childrenField: {
            type: String,
            default: "children"
        },
        // 节点路径
        keyMap: {
            type: String,
            default: null
        },
        // 节点高度
        nodeHeight: {
            type: Number,
            default: 50
        },
        // 父级节点
        parentNode: {
            type: Object,
            default: Object
        },
        // 动画曲线
        atf: {
            type: String,
            default: "ease"
        },
        // 动画时间
        attime: {
            type: Number,
            default: 300
        },
        // 动画时间
        checked: {
            type: String,
            default: null
        },
        // 级别
        level: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            currentOptions: [],
            checkedMap: null,
        }
    },
    computed:{
        // 缩进计算
        paddingLeft() {
            return this.indent*this.indentIndex+"px";
        },
    },
    watch: {
        options() {
            this.initOptions();
        },
        checked(){
            this.initChecked();
        }
    },
    mounted() {
        this.initChecked();
        this.initOptions();
    },
    methods: {
        // 获取节点路径的总个数，包含本身
        getNodeIndex(item) {
            let index = 1;
            if(item[this.childrenField] && item.node_open) {
                item[this.childrenField].forEach((e) => {
                    index += this.clacHeight(e);
                });
            }
            return  index;
        },
        // 高度计算
        clacHeight(item){
            return this.getNodeIndex(item);
        },
        // 初始化checked状态
        initChecked() {
            // 拷贝数据
            this.checkedMap = this.checked;
        },
        // 初始化选项
        initOptions() {
            // 拷贝数据
            this.currentOptions = this.options
        },
        // 点击切换
        toggleClick(item, key, node) {
            if(!node.node_parent){
                this.emitChecked(node.keyMap);
            }
            item.node_open = !item.node_open;
            this.$set(this.currentOptions, key, item);
            if(node.node_parent){
                // 父节点切换
                this.emitParent(node);
            } else {
                // 子节点切换
                this.emitChild(node);
            }
            // 节点切换
            this.emitNode(node);
        },
        // 父节点切换
        emitParent(node){
            this.$emit('parent',node);
        },
        // 子节点切换
        emitChild(node){
            this.$emit('child',node);
        },
        // 节点切换
        emitNode(node){
            this.$emit('node',node);
        },
        // 节点checked状态判断
        emitChecked(keyMap){
            if(this.isTop){
                this.checkedMap = keyMap;
                return;
            }
            this.$emit('checked',keyMap);
        }
    },
}
</script>

<style scoped lang="less">
    .Tree {
        width: 500px;
        margin: auto;
        &.isTop{
            margin-top: 10px;
        }
        .nodeStyles(){
            cursor: pointer;
        }
        .node_row{
            overflow: hidden;
            .node{
                .nodeStyles();
                &.node_top{
                    margin-top: 0;
                }
            }
        }

    }
</style>
