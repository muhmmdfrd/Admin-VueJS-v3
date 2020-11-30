<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Dashboard" />
    </div>
</template>

<script>
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";

export default {
    name: "DashboardPage",
    data: function() {
        return {
            isLoading: true,
        };
    },
    components: {
        TitleHeader,
        LoadingComponent,
    },
    mounted: function() {
        const vm = this;
        setTimeout(function() {
            vm.isLoading = false;
        }, 100);
    },
};
</script>
