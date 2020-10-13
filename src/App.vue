<template>
    <MainWrapper>
        <div class="navbar-bg"></div>
        <TopBar />
        <SideBar />
    </MainWrapper>
</template>

<script>
import MainWrapper from "../src/containers/MainWrapper.vue";
import TopBar from "../src/components/Topbar/TopBar.vue";
import SideBar from "../src/components/Sidebar/SideBar.vue";

export default {
    name: "App",
    components: {
        MainWrapper,
        TopBar,
        SideBar,
    },
};
</script>
