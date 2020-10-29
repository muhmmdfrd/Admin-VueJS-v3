<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Dashboard" />
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6 col-12"></div>
        </div>
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
        }, 2000);
    },
};
</script>
