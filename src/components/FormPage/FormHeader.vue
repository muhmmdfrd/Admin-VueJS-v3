<template>
    <div class="card-header">
        <div class="col-md-6">
            <slot />
        </div>
        <div class="col-md-6">
            <h6 class="float-right text-primary">{{ getFormStatus }} Data</h6>
        </div>
    </div>
</template>

<script>
import { getParamsId } from "../../helpers/UtilHelper";
export default {
    name: "FormHeader",
    computed: {
        getFormStatus() {
            return getParamsId() === 0 ? "Create" : "Update";
        },
    },
};
</script>
