<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Borrowing" />
        <index-table
            :current="current"
            :dataBody="data"
            :size="size"
            :titleHeader="titles"
            :configs="configs"
            :add="add"
            @keyword="onSearch"
            @paging="onPaging"
            @detail="detail"
        />
    </div>
</template>

<script>
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import IndexTable from "../../components/Table/IndexTable.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import AjaxService from "../../services/AjaxService";
import { dateDiff, epochCompare, epochToDate } from "../../helpers/DateHelper";
import { currency } from "../../helpers/UtilHelper";

const alert = new AlertHelper();

export default {
    name: "BorrowingPage",
    components: { TitleHeader, LoadingComponent, IndexTable },
    data: function() {
        return {
            isLoading: false,
            current: 1,
            data: [],
            titles: [],
            configs: [],
        };
    },
    methods: {
        add() {
            window.router.push("borrowing/0");
        },
        detail(id) {
            window.router.push(`borrowing/${id}`);
        },
        onSearch(keyword) {
            this.current = 1;
            this.getData(this.current, keyword);
        },
        onPaging(index) {
            this.current = index;
            this.getData(this.current);
        },
        async getData(current, keyword = "") {
            const vm = this;
            const requestData = {
                method: "BorrowingGetAll",
                PageIndex: current,
                Keyword: keyword,
            };

            vm.isLoading = true;

            AjaxService(
                requestData,
                function({ Values }) {
                    const { Data, RecordsTotal, RecordsFiltered } = Values;

                    vm.titles = [
                        "Date",
                        "User",
                        "Title Book",
                        "Qty",
                        "Expired Date",
                        "Status",
                        "Total Penalty",
                    ];
                    vm.data = Data;
                    vm.size = keyword === "" ? RecordsTotal : RecordsFiltered;
                    vm.configs = [
                        {
                            field: "DateOfBorrowing",
                            render: function(data) {
                                return epochToDate(data);
                            },
                        },
                        {
                            field: "Username",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "Title",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "Qty",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "Deadline",
                            render: function(data) {
                                return epochToDate(data);
                            },
                        },
                        {
                            field: "IsPenalty",
                            render: function(data, row) {
                                let result = "";
                                let label = "";

                                switch (row.Status) {
                                    case 1:
                                        result = "Returned";
                                        label = "success";
                                        break;
                                    case 2:
                                        result = "Late";
                                        label = "danger";
                                        break;
                                    default:
                                        if (
                                            data &&
                                            !epochCompare(row.Deadline)
                                        ) {
                                            result = "Active";
                                            label = "info";
                                        } else {
                                            result = "Expired";
                                            label = "warning";
                                        }
                                        break;
                                }

                                return `<span class='badge badge-pill badge-${label}'>${result}</span>`;
                            },
                            html: true,
                        },
                        {
                            field: "TotalPenalty",
                            render: function(data, row) {
                                let total = 0;
                                let result = currency(0);

                                if (row.Status === 0) {
                                    total =
                                        (data + 1) *
                                        dateDiff(row.Deadline) *
                                        1000;

                                    result =
                                        data == undefined &&
                                        !epochCompare(row.Deadline)
                                            ? "-"
                                            : currency(total);
                                } else {
                                    result = currency(data);
                                }

                                return result;
                            },
                        },
                    ];
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.isLoading = false;
                },
            );
        },
    },
    mounted: function() {
        this.getData(this.current);
    },
};
</script>
