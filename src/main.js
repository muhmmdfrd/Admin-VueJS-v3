import {
    createApp
} from 'vue'

// css inject
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/style.css"
import "./assets/css/custom.css"
import "./assets/css/components.css"

// js inject
import "jquery/dist/jquery"
import "popper.js"
import "bootstrap/dist/js/bootstrap.min.js"
import "jquery.nicescroll"
import "./assets/js/stisla"
import "./assets/js/scripts"
import lodash from "lodash";
import "./assets/js/page/modules-datatables";

window._ = lodash;

// router
import Router from './routes/Router';

window.router = Router;

// main component
import Index from "./Index.vue";

createApp(Index).use(Router).mount('#app')