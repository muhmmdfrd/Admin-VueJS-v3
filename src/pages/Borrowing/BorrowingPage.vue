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
            @keyword="onSearch"
        />
    </div>
</template>

<script>
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import IndexTable from "../../components/Table/IndexTable.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import AjaxService from "../../services/AjaxService";
import { epochToDate } from "../../helpers/DateHelper";

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
        onSearch(keyword) {
            this.current = 1;
            this.getData(this.current, keyword);
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
                            render: function(data) {
                                return data ? "Active" : "Expired";
                            },
                        },
                        {
                            field: "TotalPenalty",
                            render: function(data) {
                                return data == 0 ? "-" : data;
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
