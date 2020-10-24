<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Basic DataTables</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped" id="table-1">
                            <thead>
                                <tr>
                                    <th class="text-center">
                                        #
                                    </th>
                                    <th>Task Name</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, index) in data" :key="index">
                                    <td>
                                        {{ index + 1 }}
                                    </td>
                                    <td>{{ value.message }}</td>
                                    <td>{{ value.date }}</td>
                                    <td>
                                        <div
                                            :class="
                                                `badge badge-${value.label}`
                                            "
                                        >
                                            {{ value.status }}
                                        </div>
                                    </td>
                                    <td>
                                        <a href="#" class="btn btn-secondary"
                                            >Detail</a
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "ExampleTable",
    setup: function() {
        const data = ref([
            {
                message: "Create a mobile app",
                date: "20-01-2020",
                label: "success",
                status: "Completed",
            },
            {
                message: "Redesign homepage",
                date: "20-04-2020",
                label: "info",
                status: "Todo",
            },
            {
                message: "Backup database",
                date: "21-04-2020",
                label: "warning",
                status: "In Progress",
            },
            {
                message: "Input data",
                date: "16-01-2020",
                label: "success",
                status: "Completed",
            },
        ]);

        return { data };
    },
};
</script>
