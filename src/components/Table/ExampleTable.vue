<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>
                        <button class="btn btn-success" @click="formAddData()">
                            Add
                        </button>
                    </h4>
                    <div class="card-header-form">
                        <form>
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Search by Task Name"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <tr>
                                <th class="text-center">#</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Status</th>
                                <th colspan="2" class="text-center">Action</th>
                            </tr>
                            <tr v-for="(value, index) in data" :key="index">
                                <td class="p-0 text-center">{{ index + 1 }}</td>
                                <td>{{ value.name }}</td>
                                <td>{{ value.username }}</td>
                                <td>
                                    <div class="badge badge-success">
                                        online
                                    </div>
                                </td>
                                <td class="text-center">
                                    <button
                                        class="btn btn-info mr-1"
                                        @click="detail(value.id)"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        class="btn btn-danger ml-1"
                                        @click="deleteData(value.name)"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="card-footer text-right">
                    <nav class="d-inline-block">
                        <ul class="pagination mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1"
                                    ><i class="fas fa-chevron-left"></i
                                ></a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#"
                                    ><i class="fas fa-chevron-right"></i
                                ></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ExampleTable",
    props: {
        data: {
            type: [],
        },
        deleteData: {
            type: Function,
        },
        detail: {
            type: Function,
        },
    },
    methods: {
        formAddData: () => {
            window.router.push("/blank/0");
        },
    },
};
</script>
