<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Role" />
        <index-table
            :titleHeader="titles"
            :dataBody="datas"
            :configs="configs"
            :size="size"
            :current="current"
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
    name: "RolePage",
    data: function() {
        return {
            isLoading: false,
            current: 1,
            keyword: "",
            datas: [],
            titles: [],
            size: 0,
            configs: [],
        };
    },
    methods: {
        async getData(current, keyword = "") {
            const vm = this;
            const requestData = {
                method: "RoleGetAll",
                pageIndex: current,
                keyword: keyword,
            };

            vm.isLoading = true;

            AjaxService(
                requestData,
                function({ Values }) {
                    const { RecordsTotal, RecordsFilterred, Data } = Values;

                    vm.titles = ["Role Name"];
                    vm.datas = Data;
                    vm.size =
                        vm.keyword === "" ? RecordsTotal : RecordsFilterred;
                    vm.configs = [
                        {
                            field: "Name",
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
                if (response === "yes") {
                    vm.isLoading = true;

                    const requestData = {
                        method: "RoleDelete",
                        id: id,
                    };

                    AjaxService(
                        requestData,
                        function(response) {
                            console.log(response);
                        },
                        function(err) {
                            alert.err(err);
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
        detail(id) {
            window.router.push(`role/${id}`);
        },
        add() {
            window.router.push("role/0");
        },
    },
    mounted: function() {
        this.getData(this.current);
    },
};
</script>
