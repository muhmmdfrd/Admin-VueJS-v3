<template>
    <li>
        <router-link class="nav-link" :to="path" exact="true">
            <i :class="`fas fa-${icon}`"></i>
            <span>{{ menuName }}</span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: "MenuSidebar",
    props: {
        path: {
            type: String,
        },
        icon: {
            type: String,
        },
        menuName: {
            type: String,
        },
    },
};
</script>
