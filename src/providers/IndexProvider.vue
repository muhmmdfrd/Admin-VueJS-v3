<template>
    <user-provider>
        <dashboard-provider>
            <slot />
        </dashboard-provider>
    </user-provider>
</template>

<script>
import { provide, inject } from "vue";

import DashboardProvider from "./DashboardProvider.vue";
import UserProvider from "./UserProvider.vue";

export default {
    name: "IndexProvider",
    setup: function() {
        provide("userProvider", inject("name"));
        provide("dashboardProvider", inject("dashboard"));
    },
    components: {
        UserProvider,
        DashboardProvider,
    },
};
</script>
