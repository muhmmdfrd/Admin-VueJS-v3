<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Book" />
        <book-table
            :data="data"
            :detail="detail"
            :deleteData="deleteData"
            :current="current"
            :size="size"
            @paging="onPaging"
            @keyword="onSearch"
        />
    </div>
</template>

<script>
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import BookTable from "../../components/Table/BookTable";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import AjaxService from "../../services/AjaxService";

const alert = new AlertHelper();

export default {
    name: "BookPage",
    components: { TitleHeader, LoadingComponent, BookTable },
    data: function() {
        return {
            isLoading: false,
            data: [],
            current: 1,
            size: 0,
        };
    },
    methods: {
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
                    vm.data = Data;
                    vm.size = keyword === "" ? RecordsTotal : RecordsFiltered;
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
