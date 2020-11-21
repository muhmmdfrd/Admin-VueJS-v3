<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>
                        <button class="btn btn-success" @click.prevent="add()">
                            Add
                        </button>
                    </h4>
                    <div class="card-header-form">
                        <form>
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Search by Title or Author"
                                    id="customSearch"
                                    v-model="keyword"
                                    autocomplete="off"
                                />
                                <button class="btn btn-info ml-2">
                                    Filter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <tr>
                                <th class="text-center">#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Qty</th>
                                <th>Photo</th>
                                <th colspan="2" class="text-center">Action</th>
                            </tr>
                            <tr v-for="(value, index) in data" :key="index">
                                <td class="p-0 text-center">
                                    {{ (current - 1) * 5 + index + 1 }}
                                </td>
                                <td>{{ value.Title }}</td>
                                <td>
                                    {{ value.Author }}
                                </td>
                                <td>
                                    {{ value.Qty }}
                                </td>
                                <td>
                                    {{ value.Path }}
                                </td>
                                <td class="text-center">
                                    <button
                                        class="btn btn-info mr-1"
                                        @click.prevent="detail(value.Id)"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        class="btn btn-danger ml-1"
                                        @click.prevent="deleteData()"
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
                            <li :class="`page-item ${prevStatus}`">
                                <button
                                    class="page-link"
                                    @click.prevent="prev()"
                                >
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="javascript:">
                                    {{ current }}
                                </a>
                            </li>
                            <li :class="`page-item ${nextStatus}`">
                                <button
                                    class="page-link"
                                    @click.prevent="next()"
                                >
                                    <i class="fas fa-chevron-right"></i>
                                </button>
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
    name: "BookTable",
    methods: {
        add() {
            window.router.push("book/0");
        },
    },
    computed: {
        prevStatus() {
            return this.current == 1 ? "disabled" : "";
        },
        nextStatus() {
            return this.current == Math.ceil(this.size / 5) ? "disabled" : "";
        },
    },
    props: {
        data: {
            type: [],
        },
        detail: {
            type: Function,
        },
        deleteData: {
            type: Function,
        },
        prev: {
            type: Function,
        },
        next: {
            type: Function,
        },
        current: {
            type: Number,
        },
        size: {
            type: Number,
        },
    },
};
</script>
