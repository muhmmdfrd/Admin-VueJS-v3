<template :key="componentKey">
    <div>
        <loading-component v-show="isLoading" />
        <div v-show="!isLoading">
            <title-header title="Blank Page" />
            <example-table
                :data="data"
                :detail="detail"
                :deleteData="deletebyId"
                :searchByKeyword="searchByKeyword"
            />
        </div>
    </div>
</template>

<script>
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import ExampleTable from "../../components/Table/ExampleTable.vue";
import AlertHelper from "../../helpers/AlertHelper";
import httpRequest from "../../services/IndexService";
import UtilHelper from "../../helpers/UtilHelper";

const alert = new AlertHelper();
const helper = new UtilHelper();

export default {
    name: "BlankPage",
    components: {
        TitleHeader,
        LoadingComponent,
        ExampleTable,
    },
    data: function() {
        return { data: [], isLoading: true };
    },
    methods: {
        async getData() {
            const vm = this;
            const requestData = {
                token: helper.getToken(),
                method: "PersonGetAll",
            };

            httpRequest(requestData)
                .then(function(response) {
                    const data = response.data.d;

                    if (data.Success) {
                        vm.data = data.Values;
                    } else {
                        alert.error(data.Message);
                    }
                })
                .finally(function() {
                    vm.isLoading = false;
                });
        },
        detail(id) {
            window.router.push(`blank/${id}`);
        },
        async deletebyId(id) {
            const vm = this;
            alert.confirm(function(response) {
                if (response == "yes") {
                    httpRequest({
                        token: helper.getToken(),
                        method: "PersonDelete",
                        Id: id,
                    })
                        .then(function() {
                            vm.isLoading = true;
                        })
                        .then(function() {
                            alert.success("data deleted");
                        })
                        .catch(function(err) {
                            alert.error(err);
                        })
                        .finally(function() {
                            vm.getData();
                        });
                }
            });
        },
        async searchByKeyword(keyword) {
            const vm = this;
            const requestData = {
                method: "PersonGetByKeyword",
                token: helper.getToken(),
                Keyword: keyword,
            };

            vm.isLoading = true;
            httpRequest(requestData)
                .then(function(response) {
                    vm.data = response.data.d.Values;
                })
                .then(function() {
                    vm.isLoading = false;
                });
        },
    },
    mounted: function() {
        this.getData();
    },
};
</script>
