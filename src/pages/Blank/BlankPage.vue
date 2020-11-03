<template>
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
import UtilHelper from "../../helpers/UtilHelper";

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
        detail: (id) => {
            window.router.push(`/blank/${id}`);
            console.log(id);
        },
        deletebyId: (id) => {
            alert(id);
        },
    },
    mounted: async function() {
        var vm = this;
        helper
            .getData("users?_limit=5")
            .then(function(response) {
                vm.data = response.data;
            })
            .finally(function() {
                vm.isLoading = false;
            });
    },
};
</script>
