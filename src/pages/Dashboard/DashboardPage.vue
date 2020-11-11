<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Dashboard" />
        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-info" @click.prevent="getAlert()">
                    click
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import AlertHelper from "../../helpers/AlertHelper";

const alert = new AlertHelper();

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
    methods: {
        getAlert() {
            alert.success("Clicked");
        },
    },
    mounted: function() {
        const vm = this;
        setTimeout(function() {
            vm.isLoading = false;
        }, 2000);
    },
};
</script>
