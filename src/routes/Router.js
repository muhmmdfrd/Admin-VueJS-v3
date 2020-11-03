import {
    createRouter,
    createWebHashHistory
} from "vue-router"

import BlankPage from "../pages/Blank/BlankPage.vue";
import BlankFormPage from "../pages/Blank/BlankFormPage.vue";
import DashboardPage from "../pages/Dashboard/DashboardPage.vue";
import LoadingComponent from "../components/Loading/LoadingComponent.vue";
import NotFound from "../pages/External/404.vue";

const listRoutes = [{
    path: "/blank",
    name: "blank",
    component: BlankPage,
    props: true,
}, {
    path: "/",
    name: "home",
    component: DashboardPage,
    props: true,
}, {
    path: "/loading",
    name: "loading",
    component: LoadingComponent,
    props: true
}, {
    path: "/blank/:id",
    name: "form-blank",
    component: BlankFormPage
}, {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFound,
    props: true
}];

const Routes = new createRouter({
    history: createWebHashHistory(),
    routes: listRoutes,
});

export default Routes