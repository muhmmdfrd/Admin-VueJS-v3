<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Group Menu" />
        <index-table
            :titleHeader="titles"
            :dataBody="data"
            :current="current"
            :configs="configs"
            :size="size"
            :add="add"
            @detail="detail"
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

const alert = new AlertHelper();

export default {
    components: { TitleHeader, LoadingComponent, IndexTable },
    name: "GroupMenuPage",
    data: function() {
        return {
            isLoading: false,
            data: [],
            titles: [],
            configs: [],
            current: 1,
            size: 0,
            keyword: "",
        };
    },
    methods: {
        add() {
            window.router.push("/admin/group-menu/0");
        },
        detail(id) {
            window.router.push(`/admin/group-menu/${id}`);
        },
        onSearch(keyword) {
            this.current = 1;
            this.getData(this.current, keyword);
        },
        async getData(current, keyword = "") {
            const vm = this;
            const requestData = {
                method: "GroupMenuGetAll",
                keyword: keyword,
                pageIndex: current,
            };

            vm.isLoading = true;

            AjaxService(
                requestData,
                function({ Values }) {
                    const { Data, RecordsTotal, RecordsFiltered } = Values;

                    vm.data = Data;
                    vm.titles = ["Name", "Is Collapse"];
                    vm.size = keyword === "" ? RecordsTotal : RecordsFiltered;
                    vm.configs = [
                        {
                            field: "Name",
                            render: function(data) {
                                return data;
                            },
                        },
                        {
                            field: "IsCollapse",
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
    },
    mounted: function() {
        this.getData(this.current);
    },
};
</script>
