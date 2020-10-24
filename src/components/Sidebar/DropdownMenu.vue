<template>
    <li>
        <router-link class="nav-link" :to="path">{{ title }}</router-link>
    </li>
</template>

<script>
export default {
    name: "DropdownMenu",
    props: {
        path: {
            type: String,
        },
        title: {
            type: String,
        },
    },
};
</script>
