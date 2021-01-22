<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Menu" />
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
import IndexTable from "../../components/Table/IndexTable.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import AjaxService from "../../services/AjaxService";

const alert = new AlertHelper();

export default {
    components: { TitleHeader, LoadingComponent, IndexTable },
    name: "MenuPage",
    data: function() {
        return {
            isLoading: false,
            data: [],
            titles: [],
            configs: [],
            current: 1,
            size: 0,
        };
    },
    methods: {
        async getData(current, keyword = "") {
            const vm = this;
            const requestData = {
                method: "MenuGetAll",
                keyword: keyword,
                pageIndex: current,
            };

            vm.isLoading = true;

            AjaxService(
                requestData,
                function({ Values }) {
                    const { Data, RecordsFiltered, RecordsTotal } = Values;

                    vm.titles = [
                        "Name",
                        "Path",
                        "Icon",
                        "Group Menu",
                        "Module",
                    ];
                    vm.data = Data;
                    vm.size = keyword === "" ? RecordsTotal : RecordsFiltered;
                    vm.configs = [
                        {
                            field: "Name",
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
                        {
                            field: "Icon",
                            render: function(data) {
                                return data === "" ? "-" : data;
                            },
                        },
                        {
                            field: "GroupMenuName",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "Module",
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
                        method: "MenuDelete",
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
        onSearch(keyword) {
            this.current = 1;
            this.getData(this.current, keyword);
        },
        onPaging(indexPage) {
            this.current = indexPage;
            this.getData(this.current);
        },
        add() {
            window.router.push("menu/0");
        },
        detail(id) {
            window.router.push(`menu/${id}`);
        },
    },
    mounted: function() {
        return this.getData(this.current);
    },
};
</script>
