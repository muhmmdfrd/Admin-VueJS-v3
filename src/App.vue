<template>
    <main-wrapper>
        <top-bar />
        <side-bar />
        <main-content>
            <router-view name="admin" />
        </main-content>
    </main-wrapper>
</template>

<script>
// containers
import MainWrapper from "./containers/MainWrapper.vue";
import MainContent from "./containers/MainContent.vue";

// components
import TopBar from "./components/Topbar/TopBar.vue";
import SideBar from "./components/Sidebar/SideBar.vue";

import UtilHelper from "./helpers/UtilHelper";

const helper = new UtilHelper();

export default {
    name: "App",
    components: {
        MainWrapper,
        MainContent,
        TopBar,
        SideBar,
    },
    mounted: function() {
        if (!helper.validateModel(helper.getToken())) {
            window.router.push({ name: "login" });
        }
    },
};
</script>
