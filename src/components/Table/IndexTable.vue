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
                    <search-table-component @searchkeyword="search" />
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <tr>
                                <th class="text-center">#</th>
                                <th v-for="title in titleHeader" :key="title">
                                    {{ title }}
                                </th>
                                <th colspan="2" class="text-center">Action</th>
                            </tr>
                            <tr>
                                <td
                                    colspan="6"
                                    class="text-center"
                                    v-if="dataBody.length === 0"
                                >
                                    data not found
                                </td>
                            </tr>
                            <!-- slot -->
                            <tr v-for="(data, index) in dataBody" :key="index">
                                <td class="p-0 text-center">
                                    {{ (current - 1) * 5 + index + 1 }}
                                </td>
                                <td v-for="config in configs" :key="config">
                                    {{ config.render(data[config.field]) }}
                                </td>
                                <td class="text-center">
                                    <button
                                        class="btn btn-info mr-1"
                                        @click.prevent="detail(data.Id)"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        class="btn btn-danger ml-1"
                                        @click.prevent="deleteData(data.Id)"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <!-- end slot -->
                        </table>
                    </div>
                </div>
                <div class="card-footer text-right">
                    <nav class="d-inline-block">
                        <pagination-component
                            @pagingdata="onPaging"
                            :total="size"
                            :currentPage="current"
                            :totalPages="Math.ceil(size / 5)"
                        />
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchTableComponent from "../Search/SearchTableComponent";
import PaginationComponent from "../Pagination/PaginationComponent";

export default {
    name: "IndexTable",
    components: {
        SearchTableComponent,
        PaginationComponent,
    },
    methods: {
        onPaging(args) {
            this.$emit("paging", args);
        },
        search(args) {
            this.$emit("keyword", args);
        },
        detail(id) {
            this.$emit("detail", id);
        },
        deleteData(id) {
            this.$emit("delete-data", id);
        },
    },
    props: {
        titleHeader: {
            type: [],
            required: true,
        },
        dataBody: {
            type: [],
            required: true,
        },
        configs: {
            type: [],
            required: true,
        },
        current: {
            type: Number,
        },
        size: {
            type: Number,
            required: true,
        },
        add: {
            type: Function,
        },
    },
};
</script>
