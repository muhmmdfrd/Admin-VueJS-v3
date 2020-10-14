<template>
    <main-wrapper>
        <top-bar />
        <side-bar />
        <main-content>
            <transition name="fade">
                <router-view />
            </transition>
        </main-content>
        <footer-component />
    </main-wrapper>
</template>

<script>
// containers
import MainWrapper from "./containers/MainWrapper.vue";
import MainContent from "./containers/MainContent.vue";

// components
import TopBar from "./components/Topbar/TopBar.vue";
import SideBar from "./components/Sidebar/SideBar.vue";
import FooterComponent from "./components/Footer/FooterComponent.vue";

export default {
    name: "App",
    components: {
        MainWrapper,
        MainContent,
        TopBar,
        SideBar,
        FooterComponent,
    },
};
</script>
