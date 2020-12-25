<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="User" />
        <index-table
            :titleHeader="title"
            :dataBody="value"
            :configs="configs"
            :current="current"
            :size="size"
            :add="add"
            @paging="paging"
            @keyword="keyword"
            @detail="detail"
            @delete-data="deleteData"
        />
    </div>
</template>

<script>
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import IndexTable from "../../components/Table/IndexTable";
import AlertHelper from "../../helpers/AlertHelper";
import AjaxService from "../../services/AjaxService";
import { epochToDate } from "../../helpers/DateHelper";

const alert = new AlertHelper();

export default {
    components: { TitleHeader, LoadingComponent, IndexTable },
    name: "UserPage",
    data: function() {
        return {
            isLoading: false,
            title: [],
            value: [],
            current: 1,
            configs: [],
        };
    },
    methods: {
        async getData(index, keyword = "") {
            const vm = this;
            const requestData = {
                method: "UserGetAll",
                PageIndex: index,
                Keyword: keyword,
                current: 1,
                size: 0,
            };

            vm.isLoading = true;
            AjaxService(
                requestData,
                function({ Values }) {
                    const { Data, RecordsTotal, RecordsFiltered } = Values;

                    vm.value = Data;
                    vm.title = ["Username", "Name", "Role", "Date Of Birth"];
                    vm.size = keyword === "" ? RecordsTotal : RecordsFiltered;
                    vm.configs = [
                        {
                            field: "Username",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "Name",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "RoleName",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "DateOfBirth",
                            render: function(data) {
                                return epochToDate(data);
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
        add() {
            window.router.push("/admin/user/0");
        },
        paging(index) {
            this.current = index;
            this.getData(this.current);
        },
        keyword(text) {
            this.current = 1;
            this.getData(this.current, text);
        },
        detail(id) {
            window.router.push(`/admin/user/${id}`);
        },
        async deleteData(id) {
            const vm = this;
            alert.confirm(function(response) {
                if (response == "yes") {
                    vm.isLoading = true;

                    const requestData = {
                        method: "UserDelete",
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
</script>
