<template>
    <slot />
</template>

<script>
import { provide, ref } from "vue";

export default {
    name: "DashboardProvider",
    setup: function() {
        const listCard = ref([
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
        ]);

        provide("dashboard", listCard);
    },
};
</script>
