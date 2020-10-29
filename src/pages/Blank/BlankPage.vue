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
        detail: (name) => {
            alert(name);
        },
    },
    mounted: async function() {
        var vm = this;
        try {
            let result = await helper.getData();
            vm.data.push(await result.data());
        } catch (err) {
            console.log(err);
        } finally {
            vm.isLoading = false;
        }
    },
};
</script>
