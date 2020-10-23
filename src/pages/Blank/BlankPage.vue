<template>
    <div>
        <loading-component v-show="isLoading" />
        <div v-show="!isLoading">
            <title-header :title="user" />
        </div>
    </div>
</template>

<script>
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import { inject } from "vue";

export default {
    name: "BlankPage",
    setup: function() {
        const user = inject("name");

        return {
            user,
        };
    },
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
