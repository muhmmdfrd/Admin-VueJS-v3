<template>
    <div class="card-footer text-right">
        <input
            type="submit"
            class="btn btn-info"
            :value="getFormStatus"
            tabindex="5"
            @click="click"
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
    methods: {
        click() {
            return this.$emit("click", this.click);
        },
    },
};
</script>
