<template>
    <footer class="main-footer">
        <div class="footer-left">Copyright &copy; {{ year }}</div>
        <div class="footer-right">1.0.0</div>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent",
    data: function() {
        return {
            year: window.moment().year(),
        };
    },
};
</script>
