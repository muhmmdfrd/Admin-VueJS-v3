<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Dashboard" />
        <div class="row">
            <div
                class="col-lg-3 col-md-6 col-sm-6 col-12"
                v-for="(card, index) in list"
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
