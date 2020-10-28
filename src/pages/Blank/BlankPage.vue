<template>
    <div>
        <loading-component v-show="isLoading" />
        <div v-show="!isLoading">
            <title-header title="Blank Page" />
            <example-table :data="data" :action="detail" />
        </div>
    </div>
</template>

<script>
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import ExampleTable from "../../components/Table/ExampleTable.vue";
import httpRequest from "../../services/IndexService";

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
        detail: (name) => {
            alert(name);
        },
    },
    mounted: function() {
        var vm = this;
        httpRequest({
            method: "GET",
            path: "users/?_limit=5",
            data: {},
            type: "application/json",
        })
            .then(function(response) {
                vm.data = response.data;
            })
            .finally(function() {
                vm.isLoading = false;
            });
    },
};
</script>
