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
                <title-menu-sidebar title="Dashboard" />
                <menu-sidebar
                    path="/"
                    icon="tachometer-alt"
                    menuName="Dashboard"
                />

                <title-menu-sidebar title="Starter" />
                <li class="nav-item dropdown">
                    <a
                        href="#"
                        class="nav-link has-dropdown"
                        data-toggle="dropdown"
                        ><i class="fas fa-columns"></i> <span>Layout</span></a
                    >
                    <ul class="dropdown-menu">
                        <li>
                            <a class="nav-link" href="layout-default.html"
                                >Default Layout</a
                            >
                        </li>
                        <li>
                            <a class="nav-link" href="layout-transparent.html"
                                >Transparent Sidebar</a
                            >
                        </li>
                        <li>
                            <a
                                class="nav-link"
                                href="layout-top-navigation.html"
                                >Top Navigation</a
                            >
                        </li>
                    </ul>
                </li>
                <menu-sidebar
                    path="/blank"
                    icon="square"
                    menuName="Blank Page"
                />
            </ul>
        </aside>
    </div>
</template>

<script>
import MenuSidebar from "./MenuSidebar.vue";
import TitleMenuSidebar from "./TitleMenuSidebar.vue";

export default {
    name: "SideBar",
    components: {
        MenuSidebar,
        TitleMenuSidebar,
    },
};
</script>
