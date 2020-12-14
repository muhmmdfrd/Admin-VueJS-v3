<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Book" />
        <index-table
            :titleHeader="titles"
            :dataBody="data"
            :current="current"
            :configs="configs"
            :size="size"
            :add="add"
            @paging="onPaging"
            @keyword="onSearch"
            @detail="detail"
            @delete-data="deleteData"
        />
    </div>
</template>

<script>
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import AjaxService from "../../services/AjaxService";
import IndexTable from "../../components/Table/IndexTable";

const alert = new AlertHelper();

export default {
    name: "BookPage",
    components: { TitleHeader, LoadingComponent, IndexTable },
    data: function() {
        return {
            isLoading: false,
            data: [],
            titles: [],
            current: 1,
            size: 0,
            configs: [],
        };
    },
    methods: {
        add() {
            window.router.push("book/0");
        },
        detail(id) {
            window.router.push(`book/${id}`);
        },
        onPaging(indexPage) {
            this.current = indexPage;
            this.getData(this.current);
        },
        onSearch(keyword) {
            this.current = 1;
            this.getData(this.current, keyword);
        },
        async getData(current, keyword = "") {
            const vm = this;
            const requestData = {
                method: "BookGetAll",
                PageIndex: current,
                Keyword: keyword,
            };

            vm.isLoading = true;

            AjaxService(
                requestData,
                function({ Values }) {
                    const { Data, RecordsTotal, RecordsFiltered } = Values;

                    vm.titles = ["Title", "Author", "Qty", "Photo"];
                    vm.data = Data;
                    vm.size = keyword === "" ? RecordsTotal : RecordsFiltered;
                    vm.configs = [
                        {
                            field: "Title",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "Author",
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
                            field: "Path",
                            render: function(data) {
                                return data;
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
        async deleteData(id) {
            const vm = this;
            alert.confirm(function(response) {
                if (response == "yes") {
                    vm.isLoading = true;

                    const requestData = {
                        method: "BookDelete",
                        Id: id,
                    };

                    AjaxService(
                        requestData,
                        function() {
                            alert.success("data deleted");
                        },
                        function(err) {
                            alert.error(err);
                        },
                        function() {
                            vm.getData(vm.current);
                        },
                    );
                }
            });
        },
    },
    mounted: function() {
        this.getData(this.current);
    },
};
LoadingComponent;
</script>
