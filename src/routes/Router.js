import {
    createRouter,
    createWebHashHistory
} from "vue-router"

import BlankPage from "../pages/Blank/BlankPage.vue";
import BlankFormPage from "../pages/Blank/BlankFormPage.vue";
import DashboardPage from "../pages/Dashboard/DashboardPage.vue";
import NotFound from "../pages/External/404.vue";
import LoginPage from "../pages/Login/LoginPage.vue";
import App from "../App.vue";

const listRoutes = [{
        path: "/",
        name: "login",
        component: LoginPage,
        props: true,
    }, {
        path: "/admin",
        name: "admin",
        component: App,
        props: true,
        children: [{
            path: "blank",
            name: "blank",
            components: {
                admin: BlankPage
            },
            props: true,
        }, {
            path: "blank/:id",
            name: "form-blank",
            components: {
                admin: BlankFormPage
            },
            props: true
        }, {
            path: "dashboard",
            name: "dashboard",
            components: {
                admin: DashboardPage
            },
            props: true,
        }, {
            path: ":catchAll(.*)",
            name: "not-found",
            component: NotFound,
            props: true
        }]
    },
    {
        path: "/:catchAll(.*)",
        name: "not-found",
        component: NotFound,
        props: true
    }
];

const Routes = new createRouter({
    history: createWebHashHistory(),
    routes: listRoutes,
});

export default Routes