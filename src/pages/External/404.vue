<template>
    <div class="container mt-5">
        <div class="page-error">
            <div class="page-inner">
                <h1>404</h1>
                <div class="page-description">
                    The page you were looking for could not be found.
                </div>
                <div class="page-search">
                    <div class="mt-3">
                        <router-link to="/">Back to Dashboard</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>
