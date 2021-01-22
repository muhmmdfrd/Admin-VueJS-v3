<template>
    <title-header title="User Form" />
    <loading-component v-show="isLoading" />
    <form-wrapper>
        <form-header>
            <back-button @click="back()" />
        </form-header>
        <form-body>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            class="form-control"
                            required
                            v-model="model.Username"
                            tabindex="1"
                        />
                        <div class="invalid-feedback">
                            Oh no! Username is invalid.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            class="form-control"
                            required
                            v-model="model.Name"
                            tabindex="2"
                        />
                        <div class="invalid-feedback">
                            Oh no! Name is invalid.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Date Of Birth</label>
                        <input
                            type="date"
                            class="form-control datepicker"
                            required
                            v-model="model.DateOfBirth"
                            tabindex="3"
                        />
                        <div class="invalid-feedback">
                            Oh no! Data Of Birth is invalid.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label>Password</label>
                    <input
                        type="password"
                        class="form-control"
                        required
                        v-model="model.Password"
                        tabindex="4"
                    />
                    <div class="invalid-feedback">
                        Oh no! Password is invalid.
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>Role</label>
                    <select
                        class="form-control"
                        required
                        v-model="model.RoleId"
                        tabindex="5"
                    >
                        <option
                            v-for="role in formData"
                            :key="role"
                            :value="role.Id"
                        >
                            {{ role.Name }}
                        </option>
                    </select>
                </div>
            </div>
        </form-body>
        <submit-button>
            <input
                type="submit"
                class="btn btn-info"
                :value="getFormStatus"
                tabindex="6"
                @click.prevent="submit"
            />
        </submit-button>
    </form-wrapper>
</template>

<script>
import TitleHeader from "../../components/Title/TitleHeader.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import AjaxService from "../../services/AjaxService";
import AlertHelper from "../../helpers/AlertHelper";
import FormWrapper from "../../components/FormPage/FormWrapper.vue";
import FormHeader from "../../components/FormPage/FormHeader.vue";
import FormBody from "../../components/FormPage/FormBody.vue";
import SubmitButton from "../../components/FormPage/SubmitButton.vue";
import BackButton from "../../components/FormPage/BackButton.vue";
import { epochToSqlDate } from "../../helpers/DateHelper";
import { getParamsId } from "../../helpers/UtilHelper";

const alert = new AlertHelper();

export default {
    name: "UserFormPage",
    components: {
        TitleHeader,
        LoadingComponent,
        FormWrapper,
        SubmitButton,
        BackButton,
        FormBody,
        FormHeader,
    },
    data: function() {
        return {
            isLoading: false,
            model: {},
            formData: [],
        };
    },
    methods: {
        async getRole() {
            const vm = this;
            const requestData = {
                method: "RoleGetAll",
            };

            AjaxService(
                requestData,
                function({ Values }) {
                    vm.formData = Values.Data;
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.isLoading = false;
                },
            );
        },
        async getDataById() {
            const vm = this;
            const requestData = {
                method: "UserGetAll",
                Id: getParamsId(),
            };

            vm.isLoading = true;
            AjaxService(
                requestData,
                function({ Values }) {
                    vm.model = Values.Data.shift();
                    vm.model.DateOfBirth = epochToSqlDate(vm.model.DateOfBirth);
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.getRole();
                },
            );
        },
        back() {
            window.router.push("/admin/user");
        },
        submit() {
            const vm = this;

            vm.model.method = getParamsId() === 0 ? "UserCreate" : "UserUpdate";
            vm.model.Id = getParamsId();
            vm.isLoading = true;
            vm.save(vm.model);
        },
        save(data) {
            const vm = this;

            AjaxService(
                data,
                function() {
                    alert.success(`Data ${vm.getFormStatus}d`);
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
    computed: {
        getFormStatus() {
            return getParamsId() === 0 ? "Create" : "Update";
        },
    },
    mounted: function() {
        if (getParamsId() == 0) {
            this.isLoading = true;
            this.getRole();
        } else {
            this.getDataById();
        }
    },
};
</script>
