import {
    createRouter,
    createWebHashHistory
} from "vue-router"

import DashboardPage from "../pages/Dashboard/DashboardPage.vue";
import NotFound from "../pages/External/404.vue";
import LoginPage from "../pages/Login/LoginPage.vue";
import BookPage from "../pages/Book/BookPage.vue";
import BookFormPage from "../pages/Book/BookFormPage.vue";
import UserPage from '../pages/User/UserPage.vue';
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
                path: "dashboard",
                name: "dashboard",
                components: {
                    admin: DashboardPage
                },
                props: true,
            },
            {
                path: "book",
                name: "book",
                components: {
                    admin: BookPage
                },
                props: true
            },
            {
                path: "book/:id",
                name: "book-form",
                components: {
                    admin: BookFormPage
                },
                props: true
            },
            {
                path: "user",
                name: "user",
                components: {
                    admin: UserPage
                }
            },
            {
                path: ":catchAll(.*)",
                name: "not-found",
                component: NotFound,
                props: true
            }
        ]
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