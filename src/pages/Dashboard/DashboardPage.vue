<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Dashboard" />
        <div class="row">
            <div
                class="col-lg-3 col-md-6 col-sm-6 col-12"
                v-for="(card, index) in listCard"
                :key="index"
            >
                <general-card
                    :title="card.title"
                    :value="card.value"
                    :icon="card.icon"
                    :theme="card.theme"
                />
            </div>
        </div>
    </div>
</template>

<script>
import GeneralCard from "../../components/Card/General/GeneralCard.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";

export default {
    name: "DashboardPage",
    data: function() {
        return {
            listCard: [
                {
                    title: "Total Admin",
                    value: 10,
                    icon: "user",
                    theme: "primary",
                },
                {
                    title: "News",
                    value: 42,
                    icon: "newspaper",
                    theme: "danger",
                },
                {
                    title: "Report",
                    value: 1201,
                    icon: "file",
                    theme: "warning",
                },
                {
                    title: "Online Users",
                    value: 47,
                    icon: "circle",
                    theme: "info",
                },
            ],
            isLoading: true,
        };
    },
    components: {
        GeneralCard,
        TitleHeader,
        LoadingComponent,
    },
    mounted: function() {
        const vm = this;
        setTimeout(function() {
            vm.isLoading = false;
        }, 5000);
    },
};
</script>
