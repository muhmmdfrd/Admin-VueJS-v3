<template>
    <loading-component v-show="isLoading" />
    <title-header title="Book Form" />
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
import TitleHeader from "../../components/Title/TitleHeader.vue";

export default {
    name: "BookFormPage",
    components: { TitleHeader },
};
</script>
