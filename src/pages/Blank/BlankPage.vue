<template :key="componentKey">
    <div>
        <loading-component v-show="isLoading" />
        <div v-show="!isLoading">
            <title-header title="Blank Page" />
            <example-table
                :data="data"
                :detail="detail"
                :deleteData="deletebyId"
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

const alert = new AlertHelper();

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
                token: "kmzwa8awaa",
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
            alert.confirm();
            console.log(id);
        },
    },
    mounted: function() {
        const vm = this;
        vm.getData();
    },
};
</script>
