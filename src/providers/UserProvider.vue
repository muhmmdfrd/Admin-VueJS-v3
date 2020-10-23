<template>
    <slot />
</template>

<script>
import { provide } from "vue";

export default {
    name: "UserProvider",
    setup: function() {
        provide("name", "farid");
    },
};
</script>
