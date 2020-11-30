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
import httpRequest from "../../services/IndexService";

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
            vm.isLoading = true;

            const requestData = {
                method: "BookGetAll",
                PageIndex: current,
                Keyword: keyword,
            };

            httpRequest(requestData)
                .then(function(response) {
                    const data = response.data.d;
                    const { Data, RecordsFiltered, RecordsTotal } = data.Values;

                    if (data.Success) {
                        vm.data = Data;
                        vm.size =
                            keyword === "" ? RecordsTotal : RecordsFiltered;
                    } else {
                        alert.error(data.Message);
                    }
                })
                .catch(function(err) {
                    alert.error(err);
                })
                .finally(function() {
                    vm.isLoading = false;
                });
        },
        async deleteData(id) {
            const vm = this;
            const requestData = {
                method: "BookDelete",
                Id: id,
            };
            alert.confirm(function(response) {
                if (response == "yes") {
                    vm.isLoading = true;
                    httpRequest(requestData)
                        .then(function(resp) {
                            const result = resp.data.d;
                            if (result.Success) {
                                alert.success("data deleted");
                            } else {
                                alert.error(result.Message);
                            }
                        })
                        .catch(function(err) {
                            alert.error(err);
                        })
                        .finally(function() {
                            vm.isLoading = false;
                        });
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
