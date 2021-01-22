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
import UserFormPage from "../pages/User/UserFormPage.vue";
import BorrowingPage from '../pages/Borrowing/BorrowingPage.vue';
import BorrowingFormPage from '../pages/Borrowing/BorrowingFormPage.vue';
import RolePage from "../pages/Role/RolePage.vue";
import RoleFormPage from "../pages/Role/RoleFormPage.vue";
import MenuPage from "../pages/Menu/MenuPage.vue";
import MenuFormPage from "../pages/Menu/MenuFormPage.vue";
import GroupMenuPage from "../pages/GroupMenu/GroupMenuPage.vue";
import GroupMenuFormPage from "../pages/GroupMenu/GroupMenuFormPage.vue";
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
                path: "user/:id",
                name: "user-form",
                components: {
                    admin: UserFormPage
                },
                props: true
            },
            {
                path: "transaction/borrowing",
                name: "borrowing",
                components: {
                    admin: BorrowingPage
                },
                props: true
            },
            {
                path: "transaction/borrowing/:id",
                name: "borrowing-form",
                components: {
                    admin: BorrowingFormPage
                },
                props: true
            },
            {
                path: "role",
                name: "role",
                components: {
                    admin: RolePage
                },
                props: true
            },
            {
                path: "role/:id",
                name: "role-form",
                components: {
                    admin: RoleFormPage
                },
                props: true
            },
            {
                path: "menu",
                name: "menu",
                components: {
                    admin: MenuPage
                },
                props: true
            },
            {
                path: "menu/:id",
                name: "menu-form",
                components: {
                    admin: MenuFormPage
                },
                props: true
            },
            {
                path: "group-menu",
                name: "group-menu",
                components: {
                    admin: GroupMenuPage
                }
            },
            {
                path: "group-menu/:id",
                name: "group-menu-form",
                components: {
                    admin: GroupMenuFormPage
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