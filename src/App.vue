<template>
    <index-provider>
        <main-wrapper>
            <top-bar />
            <side-bar />
            <main-content>
                <router-view />
            </main-content>
            <footer-component />
        </main-wrapper>
    </index-provider>
</template>

<script>
// containers
import MainWrapper from "./containers/MainWrapper.vue";
import MainContent from "./containers/MainContent.vue";

// components
import TopBar from "./components/Topbar/TopBar.vue";
import SideBar from "./components/Sidebar/SideBar.vue";
import FooterComponent from "./components/Footer/FooterComponent.vue";

// providers
import IndexProvider from "./providers/IndexProvider.vue";

export default {
    name: "App",
    components: {
        MainWrapper,
        MainContent,
        TopBar,
        SideBar,
        FooterComponent,
        IndexProvider,
    },
};
</script>
