<template>
    <title-header title="Group Menu Form" />
    <loading-component v-show="isLoading" />
    <form-wrapper>
        <form-header>
            <back-button @click.prevent="back" />
        </form-header>
        <form-body>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="groupName">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="model.Name"
                            required
                            tabindex="1"
                        />
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label class="form-label">Is Collapse</label>
                        <div class="selectgroup w-100">
                            <label class="selectgroup-item">
                                <input
                                    type="radio"
                                    name="value"
                                    value="true"
                                    class="selectgroup-input"
                                    v-model="model.IsCollapse"
                                    tabindex="2"
                                />
                                <span class="selectgroup-button">Yes</span>
                            </label>
                            <label class="selectgroup-item">
                                <input
                                    type="radio"
                                    name="value"
                                    value="false"
                                    class="selectgroup-input"
                                    v-model="model.IsCollapse"
                                    tabindex="3"
                                />
                                <span class="selectgroup-button">No</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form-body>
        <submit-button>
            <input
                type="submit"
                class="btn btn-info"
                :value="getFormStatus"
                tabindex="4"
                @click.prevent="save"
            />
        </submit-button>
    </form-wrapper>
</template>

<script>
import BackButton from "../../components/FormPage/BackButton.vue";
import FormBody from "../../components/FormPage/FormBody.vue";
import FormHeader from "../../components/FormPage/FormHeader.vue";
import FormWrapper from "../../components/FormPage/FormWrapper.vue";
import SubmitButton from "../../components/FormPage/SubmitButton.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import { getParamsId } from "../../helpers/UtilHelper";
import AjaxService from "../../services/AjaxService";

const alert = new AlertHelper();

export default {
    components: {
        TitleHeader,
        FormWrapper,
        FormHeader,
        FormBody,
        SubmitButton,
        BackButton,
        LoadingComponent,
    },
    name: "GroupMenuFormPage",
    data: function() {
        return {
            model: {},
            id: getParamsId(),
            isLoading: true,
        };
    },
    methods: {
        async getData() {
            const vm = this;
            const requestData = {
                method: "GroupMenuGetAll",
                id: vm.id,
            };

            AjaxService(
                requestData,
                function({ Values }) {
                    vm.model = Values.Data.shift();
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.isLoading = false;
                },
            );
        },
        async save() {
            const vm = this;
            vm.isLoading = true;
            vm.model.method =
                vm.id === 0 ? "GroupMenuCreate" : "GroupMenuUpdate";

            AjaxService(
                vm.model,
                function(response) {
                    alert.success(response.Message);
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.isLoading = false;
                    vm.back();
                },
            );
        },
        back() {
            window.router.push("/admin/group-menu");
        },
    },
    computed: {
        getFormStatus() {
            return this.id == 0 ? "Save" : "Update";
        },
    },
    mounted: function() {
        return this.id == 0 ? (this.isLoading = false) : this.getData();
    },
};
</script>
