<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Book" />
        <book-table
            :data="data"
            :detail="detail"
            :deleteData="deleteData"
            :next="next"
            :prev="prev"
            :current="current"
            :size="size"
        />
    </div>
</template>

<script>
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import BookTable from "../../components/Table/BookTable";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import httpRequest from "../../services/IndexService";

const alert = new AlertHelper();

export default {
    name: "BookPage",
    components: { TitleHeader, LoadingComponent, BookTable },
    data: function() {
        return {
            isLoading: false,
            data: [],
            current: 1,
            size: 0,
        };
    },
    methods: {
        detail(id) {
            window.router.push(`book/${id}`);
        },
        next() {
            this.getData(++this.current);
        },
        prev() {
            this.getData(--this.current);
        },
        async getData(current) {
            const vm = this;
            vm.isLoading = true;

            const requestData = {
                method: "BookGetAll",
                PageIndex: current,
            };

            httpRequest(requestData)
                .then(function(response) {
                    const data = response.data.d;

                    if (data.Success) {
                        vm.data = data.Values.Data;
                        vm.size = data.Values.RecordsTotal;
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
        },
        async deleteData(id) {
            const vm = this;
            const requestData = {
                method: "BookDelete",
                Id: id,
            };
            alert.confirm(function(response) {
                if (response == "yes") {
                    vm.isLoading = true;
                    httpRequest(requestData)
                        .then(function() {
                            alert.success("data deleted");
                        })
                        .catch(function(err) {
                            alert.error(err);
                        })
                        .finally(function() {
                            vm.isLoading = false;
                        });
                }
            });
        },
    },
    mounted: function() {
        this.getData(this.current);
    },
};
LoadingComponent;
</script>
