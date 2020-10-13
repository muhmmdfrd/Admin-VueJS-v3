import {
    createApp
} from 'vue'

// css inject
import "./assets/css/style.css"
import "./assets/css/components.css"
import "bootstrap/dist/css/bootstrap.min.css"

// js inject
// import "jquery/dist/jquery";
import "chartjs";
import "jquery.nicescroll";
import "popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "moment";
import "./assets/js/stisla";
import "./assets/js/scripts";

// main component
import App from './App.vue'

createApp(App).mount('#app')