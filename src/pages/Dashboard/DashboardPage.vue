<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Dashboard" />
        <pagination-component
            :total="28"
            :postPerPage="5"
            :currentPage="current"
            @pagingdata="onPaging"
        />
    </div>
</template>

<script>
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import PaginationComponent from "../../components/Pagination/PaginationComponent.vue";

export default {
    name: "DashboardPage",
    data: function() {
        return {
            isLoading: true,
            current: 1,
        };
    },
    emits: {},
    methods: {
        onPaging(args) {
            this.current = args;
            console.log(this.current);
        },
    },
    components: {
        TitleHeader,
        LoadingComponent,
        PaginationComponent,
    },
    mounted: function() {
        const vm = this;
        setTimeout(function() {
            vm.isLoading = false;
        }, 100);
    },
};
</script>
