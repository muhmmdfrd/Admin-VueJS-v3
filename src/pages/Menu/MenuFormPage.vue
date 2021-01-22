<template>
    <title-header tabindex="Menu Form Page" />
    <loading-component v-show="isLoading" />
    <form-wrapper>
        <form-header>
            <back-button @click.prevent="back" />
        </form-header>
        <form-body>
            <div class="row">
                <div class="col-md-4">
                    <label>Name</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="model.Name"
                        required
                        tabindex="1"
                    />
                </div>
                <div class="col-md-4">
                    <label>Path</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="model.Path"
                        required
                        tabindex="2"
                    />
                </div>
                <div class="col-md-4">
                    <label>Icon</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="model.Icon"
                        required
                        tabindex="3"
                    />
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-md-4">
                    <label>GroupMenu</label>
                    <select
                        class="form-control"
                        v-model="model.GroupMenuId"
                        required
                        tabindex="4"
                    >
                        <option
                            :value="group.Id"
                            v-for="group in formData.group"
                            :key="group"
                            >{{ group.Name }}</option
                        >
                    </select>
                </div>
                <div class="col-md-4">
                    <label>Module Name</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="model.Module"
                        required
                        tabindex="5"
                    />
                </div>
                <div class="col-md-4">
                    <input type="hidden" v-model="model.Sequence" />
                </div>
            </div>
        </form-body>
        <submit-button>
            <input
                type="submit"
                class="btn btn-info"
                :value="getFormStatus"
                tabindex="6"
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
import { getParamsId } from "../../helpers/UtilHelper";
import AlertHelper from "../../helpers/AlertHelper";
import AjaxService from "../../services/AjaxService";

const alert = new AlertHelper();

export default {
    name: "MenuFormPage",
    components: {
        TitleHeader,
        FormWrapper,
        BackButton,
        SubmitButton,
        LoadingComponent,
        FormHeader,
        FormBody,
    },
    data: function() {
        return {
            model: {},
            formData: {},
            isLoading: true,
            id: getParamsId(),
        };
    },
    methods: {
        back() {
            window.router.push("/admin/menu");
        },
        async getDataId() {
            const vm = this;
            const requestData = {
                method: "MenuGetAll",
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
                    vm.getGroup();
                },
            );
        },
        async getGroup() {
            const vm = this;
            const requestData = {
                method: "GroupMenuGetList",
            };

            AjaxService(
                requestData,
                function({ Values }) {
                    vm.formData.group = Values;
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
            vm.model.Sequence = 0;
            vm.model.method = vm.id === 0 ? "MenuCreate" : "MenuUpdate";
            vm.isLoading = true;

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
    },
    mounted: function() {
        this.id === 0 ? this.getGroup() : this.getDataId();
    },
    computed: {
        getFormStatus() {
            return this.id === 0 ? "Save" : "Update";
        },
    },
};
</script>
