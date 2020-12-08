<template>
    <div class="container mt-5">
        <div class="row">
            <div
                class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4"
            >
                <div class="login-brand">
                    <img
                        :src="loginBrand"
                        alt="logo"
                        width="100"
                        class="shadow-light rounded-circle"
                    />
                </div>

                <div class="card card-info">
                    <div class="card-header">
                        <h4 class="text-info">Login Admin</h4>
                    </div>

                    <div class="card-body">
                        <form
                            class="needs-validation"
                            novalidate=""
                            @submit.prevent="login()"
                        >
                            <div class="form-group">
                                <label for="email">Username</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    tabindex="1"
                                    required
                                    autofocus
                                    autocomplete="off"
                                    v-model="email"
                                />
                                <div class="invalid-feedback">
                                    Please fill in your email
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="d-block">
                                    <label for="password" class="control-label"
                                        >Password</label
                                    >
                                    <div class="float-right">
                                        <a
                                            href="auth-forgot-password.html"
                                            class="text-small text-info"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    class="form-control"
                                    tabindex="2"
                                    required
                                    v-model="password"
                                />
                                <div class="invalid-feedback">
                                    please fill in your password
                                </div>
                            </div>

                            <div class="form-group">
                                <button
                                    type="submit"
                                    class="btn btn-info btn-lg btn-block"
                                    tabindex="4"
                                >
                                    <span
                                        v-show="isLoading"
                                        class="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    <div v-show="!isLoading">Login</div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="mt-5 text-muted text-center">
                    Don't have an account?
                    <a href="auth-register.html" class="text-info"
                        >Create One</a
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AlertHelper from "../../helpers/AlertHelper";
import logo from "../../assets/img/stisla-fill.svg";
import $ from "jquery";
import AjaxService from "../../services/AjaxService";
import { validateModel, getToken } from "../../helpers/UtilHelper";

const alert = new AlertHelper();

export default {
    name: "LoginPage",
    mounted: function() {
        if (validateModel(getToken())) {
            window.router.push("/admin/dashboard");
        }
    },
    data: function() {
        return {
            isLoading: false,
            loginBrand: logo,
        };
    },
    methods: {
        login() {
            const vm = this;
            const requestData = {
                method: "Login",
                Username: this.email,
                Password: this.password,
            };
            vm.isLoading = true;

            $(".btn.btn-info.btn-lg.btn-block").prop("disabled", !vm.isLoading);

            AjaxService(
                requestData,
                function({ Values }) {
                    window.localStorage.setItem("_tin", Values);
                    window.router.push("/admin/dashboard");
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.isLoading = false;
                    vm.password = "";
                },
            );
        },
    },
};
</script>
