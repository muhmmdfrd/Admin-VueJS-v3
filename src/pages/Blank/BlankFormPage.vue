<template>
    <loading-component v-show="isLoading" />
    <div class="card">
        <form class="needs-validation" novalidate>
            <div class="card-header">
                <h4>{{ getFormStatus }} data</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                class="form-control"
                                required
                                v-model="name"
                            />
                            <div class="invalid-feedback">
                                What's your name?
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                class="form-control"
                                required
                                v-model="user"
                            />
                            <div class="invalid-feedback">
                                Oh no! Username is invalid.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Status</label>
                            <select class="form-control" v-model="status">
                                <option value="" disabled>Select Status</option>
                                <option value="1">Online</option>
                                <option value="0">Offline</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-right">
                <button class="btn btn-info" @click.prevent="addData">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import UtilHelper from "../../helpers/UtilHelper";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";

const helper = new UtilHelper();

export default {
    name: "BlankFormPage",
    methods: {
        addData() {
            const vm = this;
            const data = {
                name: vm.name,
                username: vm.user,
                id: Math.floor(Math.random * 10) + 1,
            };

            helper
                .addData("users", data)
                .then(function() {
                    vm.isLoading = true;
                })
                .finally(function() {
                    vm.isLoading = false;
                    alert("success");
                    window.router.push("/blank");
                });
        },
    },
    data: function() {
        return {
            status: "",
            isLoading: false,
        };
    },
    computed: {
        getFormStatus() {
            return helper.getParamsId() == "0" ? "Add" : "Edit";
        },
    },
    components: {
        LoadingComponent,
    },
};
</script>
