<template>
    <div>
        <loading-component v-show="isLoading" />
        <div v-show="!isLoading">
            <title-header title="Blank Page" />
        </div>
    </div>
</template>

<script>
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";

export default {
    name: "BlankPage",
    components: {
        TitleHeader,
        LoadingComponent,
    },
    data: function() {
        return {
            isLoading: true,
        };
    },
    mounted: function() {
        const vm = this;
        setTimeout(function() {
            vm.isLoading = false;
        }, 5000);
    },
};
</script>
