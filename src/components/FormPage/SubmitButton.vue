<template>
    <div class="card-footer text-right">
        <input
            type="submit"
            class="btn btn-info"
            :value="getFormStatus"
            tabindex="5"
        />
    </div>
</template>

<script>
import { getParamsId } from "../../helpers/UtilHelper";
export default {
    name: "SubmitButton",
    computed: {
        getFormStatus() {
            return getParamsId() === 0 ? "Create" : "Update";
        },
    },
};
</script>
