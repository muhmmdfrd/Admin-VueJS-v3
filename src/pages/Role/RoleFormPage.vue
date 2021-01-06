<template>
    <title-header title="Role Form" />
    <loading-component v-show="isLoading" />
    <form-wrapper>
        <form-header>
            <back-button @click="back" />
        </form-header>
        <form-body>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Role Name</label>
                        <input
                            type="text"
                            class="form-control"
                            required
                            v-model="model.Name"
                            tabindex="1"
                        />
                        <div class="invalid-feedback">
                            Oh no! Role Name is invalid.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5" v-for="menu in model.Permissions" :key="menu">
                <div class="col-md-2">
                    <span>{{ menu.ModuleId }}</span>
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="canRead"
                            v-model="menu.IsCanRead"
                        />
                        <label class="form-check-label" for="canRead">
                            Can Read
                        </label>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="canWrite"
                            v-model="menu.IsCanCreate"
                        />
                        <label class="form-check-label" for="canWrite">
                            Can Write
                        </label>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="canUpdate"
                            v-model="menu.IsCanUpdate"
                        />
                        <label class="form-check-label" for="canUpdate">
                            Can Update
                        </label>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="canDelete"
                            v-model="menu.IsCanDelete"
                        />
                        <label class="form-check-label" for="canDelete">
                            Can Delete
                        </label>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="showMenu"
                            v-model="menu.IsShowMenu"
                        />
                        <label class="form-check-label" for="showMenu">
                            Show Menu
                        </label>
                    </div>
                </div>
            </div>
        </form-body>
        <submit-button @click.prevent="submit" />
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
        LoadingComponent,
        FormWrapper,
        BackButton,
        SubmitButton,
        FormHeader,
        FormBody,
    },
    name: "RoleFormPage",
    data: function() {
        return { isLoading: true, model: {}, id: getParamsId(), data: [] };
    },
    methods: {
        async getData() {
            const vm = this;
            const requestData = {
                method: "RoleGetAll",
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
        async submit() {
            const vm = this;
            const requestData = vm.model;
            requestData.method = vm.id === 0 ? "RoleCreate" : "RoleUpdate";
            requestData.roleId = vm.id;

            vm.isLoading = true;

            AjaxService(
                requestData,
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
            window.router.push("/admin/role");
        },
    },
    mounted: function() {
        this.id === 0 ? (this.isLoading = false) : this.getData();
    },
};
</script>
