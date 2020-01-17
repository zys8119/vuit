import vue from "vue"
import { ComponentOptions } from "vue"
import {pageConfig} from "../../data/ComponentsConfig";
import otherApi, {windowCommon, WindowCommonAxiosRequestConfig} from "../../api/Interface";
import {AxiosPromise} from "axios";
declare const window:windowCommon
interface ContentTable extends vue{
    _currentPagination:{
        pageSizes:number;// 每页显示数量
        layout:string;// 分页布局
        noPage:boolean;// 是否分页，默认开启分页
        total:number;// 分页总数
    };
    data:any[];
    url:string;
    apiPath:string;
    api:any;
    params:object;
    currentPagination_pageNo:number;
    currentPaginationTotal:number;
    ContentTableData:any[];
    _ContentTable_pagination_getTableData():void;
    _ContentTable_pagination_getTableData_Axios(config:object):AxiosPromise;
    _ContentTable_pagination_currentPaginationChange(pageNo:number):void;
}
export default <ComponentOptions<ContentTable>>{
    data(){
      return {
          ContentTableData:[],
          currentPagination_pageNo:1,
          currentPaginationTotal:0,
      }
    },
    methods:{
        _ContentTable_pagination_currentPaginationChange(pageNo){
            if((this.url || this.apiPath) && this.$refs.contentTable_el_table) {
                this.currentPagination_pageNo = pageNo;
                this._ContentTable_pagination_getTableData();
            }else {
                if(this.data && this.$refs.contentTable_el_table){
                    this.$emit("pageChange",{
                        ...this._currentPagination,
                        pageNo:pageNo,
                    });
                }
            }
        },
        _ContentTable_pagination_getTableData_Axios(data){
            if(this.apiPath){
                let apiResult = null;
                eval(`apiResult = this.api.${this.apiPath}(${JSON.stringify(data)})`);
                return apiResult;
            }
            return this.api.otherApi.ContentTable(this.url, data);
        },
        _ContentTable_pagination_getTableData(){
            this._ContentTable_pagination_getTableData_Axios({
                ...this.params,
                pageSize:this._currentPagination.pageSizes,
                pageNo:this.currentPagination_pageNo,
                no_page:!!this._currentPagination.noPage,
            }).then((res)=>{
                this.$emit("pageChange",{
                    ...this._currentPagination,
                    pageNo:this.currentPagination_pageNo,
                });
                this.currentPaginationTotal = res.data.total;
                if(this._currentPagination.noPage){
                    this.ContentTableData = res.data;
                    return;
                }
                this.ContentTableData = res.data.list;
            })
        },
        init(){
            this.$nextTick(()=>{
                this.currentPagination_pageNo = 1;
                this.currentPaginationTotal = 0;
                this.ContentTableData = [];
                this._ContentTable_pagination_currentPaginationChange(this.currentPagination_pageNo);
                if(this.data && !((this.url || this.apiPath) && this.$refs.contentTable_el_table)){
                    this.ContentTableData = this.data;
                    this.currentPaginationTotal = this._currentPagination.total;
                }
            });
        }
    },
    watch:{
        data(){
            this.ContentTableData = this.data;
        },
        ContentTableData(){
            this.$emit("dataChange",this.ContentTableData);
        },
        _currentPagination(){
            this.init();
        },
    },
    computed:{
        _currentPagination(){
            let resultConfig = JSON.parse(JSON.stringify(pageConfig));
            return Object.assign(resultConfig,this.pageConfig);
        }
    },
}