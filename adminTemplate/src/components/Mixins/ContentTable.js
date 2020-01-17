var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { pageConfig } from "../../data/ComponentsConfig";
export default {
    data: function () {
        return {
            ContentTableData: [],
            currentPagination_pageNo: 1,
            currentPaginationTotal: 0,
        };
    },
    methods: {
        _ContentTable_pagination_currentPaginationChange: function (pageNo) {
            if ((this.url || this.apiPath) && this.$refs.contentTable_el_table) {
                this.currentPagination_pageNo = pageNo;
                this._ContentTable_pagination_getTableData();
            }
            else {
                if (this.data && this.$refs.contentTable_el_table) {
                    this.$emit("pageChange", __assign(__assign({}, this._currentPagination), { pageNo: pageNo }));
                }
            }
        },
        _ContentTable_pagination_getTableData_Axios: function (data) {
            if (this.apiPath) {
                var apiResult = null;
                eval("apiResult = this.api." + this.apiPath + "(" + JSON.stringify(data) + ")");
                return apiResult;
            }
            return this.api.otherApi.ContentTable(this.url, data);
        },
        _ContentTable_pagination_getTableData: function () {
            var _this = this;
            this._ContentTable_pagination_getTableData_Axios(__assign(__assign({}, this.params), { pageSize: this._currentPagination.pageSizes, pageNo: this.currentPagination_pageNo, no_page: !!this._currentPagination.noPage })).then(function (res) {
                _this.$emit("pageChange", __assign(__assign({}, _this._currentPagination), { pageNo: _this.currentPagination_pageNo }));
                _this.currentPaginationTotal = res.data.total;
                if (_this._currentPagination.noPage) {
                    _this.ContentTableData = res.data;
                    return;
                }
                _this.ContentTableData = res.data.list;
            });
        },
        init: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.currentPagination_pageNo = 1;
                _this.currentPaginationTotal = 0;
                _this.ContentTableData = [];
                _this._ContentTable_pagination_currentPaginationChange(_this.currentPagination_pageNo);
                if (_this.data && !((_this.url || _this.apiPath) && _this.$refs.contentTable_el_table)) {
                    _this.ContentTableData = _this.data;
                    _this.currentPaginationTotal = _this._currentPagination.total;
                }
            });
        }
    },
    watch: {
        data: function () {
            this.ContentTableData = this.data;
        },
        ContentTableData: function () {
            this.$emit("dataChange", this.ContentTableData);
        },
        _currentPagination: function () {
            this.init();
        },
    },
    computed: {
        _currentPagination: function () {
            var resultConfig = JSON.parse(JSON.stringify(pageConfig));
            return Object.assign(resultConfig, this.pageConfig);
        }
    },
};
