import {
    createRouter,
    createWebHashHistory
} from "vue-router"

import BlankPage from "../pages/Blank/BlankPage.vue";
import DashboardPage from "../pages/Dashboard/DashboardPage.vue";

const listRoutes = [{
    path: "/blank",
    name: "blank",
    component: BlankPage
}, {
    path: "/",
    name: "home",
    component: DashboardPage
}];

const Routes = new createRouter({
    history: createWebHashHistory(),
    routes: listRoutes,
});

export default Routes