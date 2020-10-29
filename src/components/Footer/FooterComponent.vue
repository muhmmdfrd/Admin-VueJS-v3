<template>
    <footer class="main-footer">
        <div class="footer-left">Copyright &copy; {{ year }}</div>
        <div class="footer-right">1.0.0</div>
    </footer>
</template>

<script>
import UtilHelper from "../../helpers/UtilHelper";

const helper = new UtilHelper();

export default {
    name: "FooterComponent",
    data: function() {
        return {
            year: helper.dateNow().year(),
        };
    },
};
</script>
