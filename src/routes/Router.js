import {
    createRouter,
    createWebHashHistory
} from "vue-router"
import BlankPage from "../components/Blank/BlankPage.vue";

const listRoutes = [{
    path: "/blank",
    name: "blank",
    component: BlankPage
}, {
    path: "/",
    name: "home",
    component: {
        template: `<div>Home</div>`
    }
}];

const Routes = new createRouter({
    history: createWebHashHistory(),
    routes: listRoutes,
});

export default Routes