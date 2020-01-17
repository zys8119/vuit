<template>
    <div class="ZXDialogAlert" v-if="showBox">
        <el-dialog :title="title"
                   :visible.sync="show"
                   :width="width"
                   :fullscreen="fullscreen"
                   :top="top"
                   :modal="modal"
                   :modalAppendToBody="modalAppendToBody"
                   :appendToBody="appendToBody"
                   :lockScroll="lockScroll"
                   :customClass="customClass"
                   :closeOnClickModal="closeOnClickModal"
                   :closeOnPressEscape="closeOnPressEscape"
                   :showClose="showClose"
                   :beforeClose="beforeClose"
                   :center="center"
                   :destroyOnClose="destroyOnClose"
                   @open="onShow"
                   @opened="onOpened"
                   @closed="onClosed"
                   @close="onHide"
                   class="x-dialog">
            <div class="ZXDialogAlert-el-dialog" :style="{maxHeight:maxHeight+'px'}">
                <component ref="component" v-if="show && components" :is="temp"></component>
                <div v-if="show && !components && content" v-html="content"
                     class="ZXDialogAlertContent console-PagePadding"></div>
                <render-html slot="title" v-if="slotTitle" :renderHtml="slotTitle"></render-html>
                <render-html slot="footer" v-if="slotFooter" :renderHtml="slotFooter"></render-html>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import importVue from "import-vue"
import renderHtml from "./renderHtml"
export default {
    name: "z-x-dialog-alert",
    components:{
        renderHtml
    },
    props: {
        components: {type: String, default: null},
        props: {type: Object, default: Object},
        content: {type: String, default: null},
        title: {type: String, default: null},
        width: {type: String, default: "50%"},
        fullscreen: {type: Boolean, default: null},
        top: {type: String, default: "15vh"},
        modal: {type: Boolean, default: true},
        modalAppendToBody: {type: Boolean, default: true},
        appendToBody: {type: Boolean, default: false},
        lockScroll: {type: Boolean, default: true},
        customClass: {type: String, default: null},
        closeOnClickModal: {type: Boolean, default: true},
        closeOnPressEscape: {type: Boolean, default: true},
        showClose: {type: Boolean, default: true},
        beforeClose: {type: Function, default: null},
        center: {type: Boolean, default: false},
        destroyOnClose: {type: Boolean, default: false},
        slotTitle: {type: Object, default: null},
        slotFooter: {type: Object, default: null},
    },
    data() {
        return {
            show: false,
            showBox: false,
            maxHeight:700,
        }
    },
    mounted() {
        this.maxHeight = (window.innerHeight - 54)*0.6;
        let WinOnResize = window.onresize;
        window.onresize = ()=>{
            this.maxHeight = (window.innerHeight - 54)*0.6;
            if(WinOnResize) WinOnResize();
        }
    },
    methods: {
        onShow() {
            this.$emit('on-show');
        },
        onHide() {
            this.$emit('on-hide');
        },
        onOpened() {
            this.$emit('on-opened');
        },
        onClosed() {
            this.showBox = false;
            this.show = false;
            this.$ZAlert.index -= 1;
            delete this.$ZAlert.vm[this.$ZAlert.index];
            this.$emit('on-closed');
        },
        init() {
            try {
                let currentView = importVue({
                    fileUrl:"",
                    name:this.components
                }).component;
                if (currentView.props && !currentView.CopyPropsBool) {
                    currentView.CopyPropsBool = true;
                    currentView.CopyProps = JSON.parse(JSON.stringify(currentView.props));
                }
                for (let j in currentView.CopyProps) {
                    currentView.props[j].default = currentView.CopyProps[j].default;
                }
                for (let i in this.props) {
                    try {
                        if (Object.keys(currentView.props).indexOf(i) > -1) {
                            currentView.props[i].default = this.props[i];
                        }
                    } catch (e) {
                        // err
                    }
                }
                this.$nextTick(() => {
                    if (currentView.methods && !currentView.methodsBool) {
                        currentView.methodsBool = true;
                        currentView.CopyMethods = JSON.parse(JSON.stringify(currentView.methods));
                    }
                    for (let j in currentView.CopyMethods) {
                        currentView.$vnode.componentOptions._events[j] = currentView.CopyMethods[j];
                    }
                    for (let i in this._event) {
                        this.$refs.component._events[i] = [this._event[i]];
                    }
                })

                return currentView;
            } catch (e) {
                // err
            }
        }
    },
    computed: {
        temp() {
            return this.init();
        }
    }
}
</script>

<style scoped lang="less">
    @themeColor: #f00;
    @pa: 25px;
    .ZXDialogAlert {
        & /deep/ .x-dialog {
            width: auto;

            .weui-mask {
                z-index: 499 !important;
            }

            .weui-dialog {
                width: auto;
                z-index: 500 !important;
            }
            .el-dialog{
                overflow: hidden;
            }
            .ZXDialogAlert-el-dialog{
                max-height: 700px;
                overflow-x: hidden;
            }
        }

        .ZXDialogAlertTitle {
            width: 100%;
            background-color: #f8f8f8;
            line-height: 40px;
            text-align: left;
            overflow: hidden;

            .minTitle {
                color: @themeColor;
                margin-left: @pa;
            }

            .iconfont {
                float: right;
                width: 50px;
                display: inline-block;
                text-align: center;
                font-size: 30px;
                cursor: pointer;

                &:hover {
                    background-color: #f8f8f8*0.9;
                }
            }

            .text {
                float: left;
                margin-left: 30px;
            }
        }

        .ZXDialogAlertContent {
            text-align: left;
            padding: @pa;
        }
    }
</style>