<template>
    <div class="card">
        <form class="needs-validation">
            <slot />
        </form>
    </div>
</template>

<script>
export default {
    name: "FormWrapper",
};
</script>
