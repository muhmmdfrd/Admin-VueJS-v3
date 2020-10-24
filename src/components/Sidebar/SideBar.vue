<template>
    <div class="main-sidebar">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <router-link to="/">Stisla</router-link>
            </div>
            <div class="sidebar-brand sidebar-brand-sm">
                <router-link to="/">Stisla</router-link>
            </div>
            <ul class="sidebar-menu">
                <!-- dashboard -->
                <title-menu-sidebar title="Dashboard" />
                <menu-sidebar
                    path="/"
                    icon="tachometer-alt"
                    menuName="Dashboard"
                />
                <!-- end of dashboard -->

                <!-- layout -->
                <title-menu-sidebar title="Starter" />
                <menu-sidebar
                    path="/blank"
                    icon="square"
                    menuName="Blank Page"
                />
                <dropdown-sidebar icon="columns" title="Layout">
                    <dropdown-menu
                        path="/layout/default"
                        title="Default Layout"
                    />
                </dropdown-sidebar>
                <!-- end of layout -->
            </ul>
        </aside>
    </div>
</template>

<script>
import MenuSidebar from "./MenuSidebar.vue";
import TitleMenuSidebar from "./TitleMenuSidebar.vue";
import DropdownSidebar from "./DropdownSidebar.vue";
import DropdownMenu from "./DropdownMenu.vue";

export default {
    name: "SideBar",
    components: {
        MenuSidebar,
        TitleMenuSidebar,
        DropdownMenu,
        DropdownSidebar,
    },
};
</script>
