<template>
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
</template>

<script>
import GeneralCard from "../../components/Card/General/GeneralCard.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";

export default {
    name: "DashboardPage",
    data: () => {
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
        };
    },
    components: {
        GeneralCard,
        TitleHeader,
    },
};
</script>
