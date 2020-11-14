<template>
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
                        {{ getFormStatus }} data
                    </h6>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                class="form-control"
                                required
                                v-model="name"
                                tabindex="1"
                            />
                            <div class="invalid-feedback">
                                Oh no! Username is invalid.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Date Of Birth</label>
                            <input
                                type="date"
                                onkeydown="return false"
                                class="form-control"
                                required
                                v-model="dateOfBirth"
                                tabindex="2"
                            />
                            <div class="invalid-feedback">
                                What's your Password?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-right">
                <input
                    type="submit"
                    class="btn btn-info"
                    value="Submit"
                    tabindex="3"
                    @click.prevent="submit"
                />
            </div>
        </form>
    </div>
</template>

<script>
import UtilHelper from "../../helpers/UtilHelper";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import AlertHelper from "../../helpers/AlertHelper";
import httpRequest from "../../services/IndexService";

const helper = new UtilHelper();
const alert = new AlertHelper();

export default {
    name: "BlankFormPage",
    methods: {
        back() {
            window.router.back();
        },
        getParamsId() {
            return helper.getParamsId();
        },
        submit() {
            const vm = this;
            if (
                !helper.validateModel(vm.dateOfBirth) ||
                !helper.validateModel(vm.name)
            ) {
                alert.error("Please fill all form!");
            } else {
                const data = {
                    Name: vm.name,
                    DateOfBirth: vm.dateOfBirth,
                    id: this.id,
                    method: this.id == 0 ? "PersonCreate" : "PersonUpdate",
                };

                this.id == "0" ? this.addData(data) : this.editData(data);
            }
        },
        async editData(data) {
            const vm = this;
            vm.isLoading = true;

            httpRequest(data)
                .then(function() {
                    alert.success("data updated");
                })
                .catch(function(err) {
                    alert.error(err);
                })
                .finally(function() {
                    vm.back();
                });
        },
        async addData(data) {
            const vm = this;
            vm.isLoading = true;

            httpRequest(data)
                .then(function() {
                    alert.success("data created");
                })
                .catch(function(err) {
                    alert.error(err);
                })
                .finally(function() {
                    vm.isLoading = false;
                    vm.back();
                });
        },
    },
    data: function() {
        return {
            status: "",
            isLoading: false,
            id: "",
        };
    },
    computed: {
        getFormStatus() {
            return this.id == "0" ? "Add" : "Edit";
        },
    },
    components: {
        LoadingComponent,
    },
    mounted: function() {
        const vm = this;
        vm.id = vm.getParamsId();

        if (vm.getParamsId() != "0") {
            vm.isLoading = true;

            httpRequest({
                method: "PersonGetById",
                Id: vm.id,
            })
                .then(function(response) {
                    const data = response.data.d;
                    if (data.Success) {
                        const { Name, DateOfBirth } = data.Values;
                        vm.name = Name;
                        vm.dateOfBirth = helper.epochToSqlDate(DateOfBirth);
                    } else {
                        alert.error(data.Message);
                    }
                })
                .catch(function(err) {
                    alert.error(err);
                })
                .finally(function() {
                    vm.isLoading = false;
                });
        }
    },
};
</script>
