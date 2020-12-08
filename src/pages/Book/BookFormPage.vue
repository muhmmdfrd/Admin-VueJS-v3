<template>
    <title-header title="Book Form" />
    <loading-component v-show="isLoading" />
    <div class="card">
        <form class="needs-validation">
            <div class="card-header">
                <div class="col-md-6">
                    <button
                        class="btn btn-info float-left"
                        @click.prevent="back()"
                    >
                        Back
                    </button>
                </div>
                <div class="col-md-6">
                    <h6 class="float-right text-primary">
                        {{ getFormStatus }} Data
                    </h6>
                </div>
            </div>
            <div class="card-body">
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
            </div>
            <div class="card-footer text-right">
                <input
                    type="submit"
                    class="btn btn-info"
                    :value="getFormStatus"
                    tabindex="5"
                    @click.prevent="submit"
                />
            </div>
        </form>
    </div>
</template>

<script>
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import { getParamsId } from "../../helpers/UtilHelper";
import AjaxService from "../../services/AjaxService";

const alert = new AlertHelper();

export default {
    name: "BookFormPage",
    components: { TitleHeader, LoadingComponent },
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

            getParamsId() === 0 ? this.save(vm.model) : this.update(vm.model);

            vm.isLoading = true;
        },
        save(data) {
            const vm = this;

            AjaxService(
                data,
                function() {
                    alert.success("data created");
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
        update(data) {
            const vm = this;

            AjaxService(
                data,
                function() {
                    alert.success("data updated");
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
        getDataById() {
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
