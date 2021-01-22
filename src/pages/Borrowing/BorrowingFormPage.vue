<template>
    <title-header title="Borrowing Form Page" />
    <loading-component v-show="isLoading" />
    <form-wrapper>
        <form-header>
            <back-button @click="back" />
        </form-header>
        <form-body>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>User</label>
                        <select
                            class="form-control"
                            v-model="model.UserId"
                            tabindex="1"
                            required
                            :disabled="this.id != 0"
                        >
                            <option
                                v-for="user in formData.user"
                                :key="user"
                                :value="user.Id"
                            >
                                {{ user.Name }}
                            </option>
                        </select>
                        <div class="invalid-feedback">
                            Oh no! User Name is invalid.
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Book</label>
                        <select
                            class="form-control"
                            v-model="model.BookId"
                            tabindex="2"
                            required
                            :disabled="this.id != 0"
                        >
                            <option
                                v-for="book in formData.book"
                                :key="book"
                                :value="book.Id"
                            >
                                {{ book.Title }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="forn-group">
                        <label>Qty</label>
                        <input
                            type="number"
                            class="form-control"
                            v-model="model.Qty"
                            tabindex="3"
                            required
                            :disabled="this.id != 0"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label>Date Of Borrow</label>
                    <input
                        type="date"
                        class="form-control"
                        v-model="model.DateOfBorrowing"
                        tabindex="4"
                        required
                        :disabled="this.id != 0"
                        min="0"
                    />
                </div>
                <div class="col-md-4">
                    <label>Deadline</label>
                    <input
                        type="date"
                        class="form-control"
                        v-model="model.Deadline"
                        tabindex="5"
                        required
                        disabled
                    />
                </div>
                <div class="col-md-4">
                    <label>Status</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="formData.IsPenalty"
                        tabindex="6"
                        required
                        disabled
                    />
                </div>
            </div>
            <div
                class="row mt-4"
                v-show="model.TotalPenalty !== 0 && model.Status !== 0"
            >
                <div class="col-md-4">
                    <label>Penalty</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="formData.TotalPenalty"
                        tabindex="7"
                        required
                        disabled
                    />
                </div>
            </div>
        </form-body>
        <submit-button v-show="model.Status === 0 || id === 0">
            <input
                v-show="this.id === 0"
                type="submit"
                class="btn btn-info"
                :value="getFormStatus"
                tabindex="8"
                @click.prevent="submit"
            />
            &nbsp;
            <input
                v-show="this.id !== 0"
                type="submit"
                class="btn btn-primary"
                value="Return"
                tabindex="9"
                @click.prevent="returnBook"
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
import { epochCompare, epochToSqlDate } from "../../helpers/DateHelper";
import { currency, getParamsId } from "../../helpers/UtilHelper";
import AjaxService from "../../services/AjaxService";

const alert = new AlertHelper();

export default {
    name: "BorrowingFormPage",
    components: {
        TitleHeader,
        FormHeader,
        BackButton,
        FormBody,
        SubmitButton,
        FormWrapper,
        LoadingComponent,
    },
    data: function() {
        return {
            isLoading: true,
            id: getParamsId(),
            model: {},
            formData: {},
        };
    },
    methods: {
        back() {
            window.router.push("/admin/transaction/borrowing");
        },
        async returnBook() {
            const vm = this;
            vm.isLoading = true;
            vm.model.method = "ReturningCreate";

            AjaxService(
                vm.model,
                function(response) {
                    alert.success(response.message);
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
        async submit() {
            const vm = this;
            vm.isLoading = true;
            vm.model.method = "BorrowingCreate";

            AjaxService(
                vm.model,
                function(resp) {
                    alert.success(resp.Message);
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
        async getUser() {
            const vm = this;
            const requestData = {
                method: "UserGetAll",
                RoleId: 6,
            };

            AjaxService(
                requestData,
                function({ Values }) {
                    vm.formData.user = Values.Data;
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.getBook();
                },
            );
        },
        async getBook() {
            const vm = this;
            const requestData = {
                method: "BookGetList",
            };

            AjaxService(
                requestData,
                function({ Values }) {
                    vm.formData.book = Values;
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.isLoading = false;
                },
            );
        },
        async getData() {
            const vm = this;
            const requestData = {
                method: "BorrowingGetAll",
                id: vm.id,
            };

            AjaxService(
                requestData,
                function({ Values }) {
                    vm.model = Values.Data.shift();

                    let date = epochToSqlDate(vm.model.DateOfBorrowing);
                    let deadline = epochToSqlDate(vm.model.Deadline);
                    let status = "";

                    switch (vm.model.Status) {
                        case 1:
                            status = "Returned";
                            break;
                        case 2:
                            status = "Late";
                            break;
                        default:
                            if (
                                !vm.model.IsPenalty &&
                                epochCompare(vm.model.Deadline)
                            ) {
                                status = "Active";
                            } else {
                                status = "Expired";
                            }
                            break;
                    }

                    vm.model.DateOfBorrowing = date;
                    vm.model.Deadline = deadline;

                    vm.formData.TotalPenalty = currency(vm.model.TotalPenalty);
                    vm.formData.IsPenalty = status;
                },
                function(err) {
                    alert.error(err);
                },
                function() {
                    vm.getUser();
                },
            );
        },
    },
    mounted: function() {
        if (this.id === 0) {
            this.isLoading = false;
            this.getUser();
        } else {
            this.getData();
        }
    },
    computed: {
        getFormStatus() {
            return this.id == 0 ? "Save" : "Update";
        },
    },
};
</script>
