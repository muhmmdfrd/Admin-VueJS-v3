<template>
    <title-header title="Book Form" />
    <loading-component v-show="isLoading" />
    <form-wrapper>
        <form-header>
            <back-button @click="back()" />
        </form-header>
        <form-body>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            class="form-control"
                            required
                            v-model="model.Title"
                            tabindex="1"
                        />
                        <div class="invalid-feedback">
                            Oh no! Title is invalid.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Author</label>
                        <input
                            type="text"
                            class="form-control"
                            required
                            v-model="model.Author"
                            tabindex="2"
                        />
                        <div class="invalid-feedback">
                            Oh no! Author is invalid.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Qty</label>
                        <input
                            type="number"
                            class="form-control"
                            required
                            v-model="model.Qty"
                            tabindex="3"
                        />
                        <div class="invalid-feedback">
                            Oh no! Qty is invalid.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Photo</label>
                        <input
                            type="text"
                            class="form-control"
                            required
                            v-model="model.Path"
                            tabindex="4"
                        />
                        <div class="invalid-feedback">
                            Oh no! Photo is invalid.
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" tabindex="5" v-model="model.Description"></textarea>
                    </div>
                </div>
            </div>
        </form-body>
        <submit-button>
            <input
                type="submit"
                class="btn btn-info"
                :value="getFormStatus"
                tabindex="5"
                @click.prevent="submit"
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
    name: "BookFormPage",
    components: {
        TitleHeader,
        LoadingComponent,
        FormWrapper,
        FormHeader,
        BackButton,
        FormBody,
        SubmitButton,
    },
    data: function() {
        return {
            isLoading: true,
            model: {},
        };
    },
    methods: {
        back() {
            window.router.push({ name: "book" });
        },
        submit() {
            const vm = this;

            vm.model.method = getParamsId() === 0 ? "BookCreate" : "BookUpdate";
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
        async getDataById() {
            const vm = this;
            const requestData = {
                method: "BookGetAll",
                Id: getParamsId(),
            };

            vm.isLoading = true;

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
    },
    computed: {
        getFormStatus() {
            return getParamsId() === 0 ? "Create" : "Update";
        },
    },
    mounted: function() {
        getParamsId() == 0 ? (this.isLoading = false) : this.getDataById();
    },
};
</script>
