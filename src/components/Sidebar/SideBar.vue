<template>
    <div class="main-sidebar">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <router-link to="/admin/dashboard">Stisla</router-link>
            </div>
            <div class="sidebar-brand sidebar-brand-sm">
                <router-link to="/admin/dashboard">Stisla</router-link>
            </div>
            <ul class="sidebar-menu">
                <template v-for="title in baseMenu" :key="title">
                    <title-menu-sidebar :title="title.Name" />
                    <template v-for="menu in title.Menus" :key="menu">
                        <menu-sidebar
                            :path="menu.Path"
                            :icon="menu.Icon"
                            :menuName="menu.Name"
                        />
                    </template>
                </template>

                <!--
                <dropdown-sidebar icon="archive" title="Transaction">
                    <dropdown-menu
                        path="/admin/transaction/borrowing"
                        title="Borrowing"
                    />
                </dropdown-sidebar> -->
            </ul>
        </aside>
    </div>
</template>

<script>
import MenuSidebar from "./MenuSidebar.vue";
import TitleMenuSidebar from "./TitleMenuSidebar.vue";
// import DropdownSidebar from "./DropdownSidebar.vue";
// import DropdownMenu from "./DropdownMenu.vue";
import { getMenu } from "../../helpers/UtilHelper";

export default {
    name: "SideBar",
    components: {
        MenuSidebar,
        TitleMenuSidebar,
        // DropdownMenu,
        // DropdownSidebar,
    },
    data: function() {
        return {
            baseMenu: [],
        };
    },
    mounted: function() {
        this.baseMenu = getMenu();
    },
};
</script>
