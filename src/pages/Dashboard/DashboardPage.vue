<template>
    <loading-component v-show="isLoading" />
    <div v-show="!isLoading">
        <title-header title="Dashboard" />
        <div class="row">
            <div
                class="col-lg-3 col-md-6 col-sm-6 col-12"
                v-for="(data, index) in datas"
                :key="index"
            >
                <general-card
                    :theme="themes[index]"
                    :title="data.Key"
                    :value="data.Value"
                    :icon="icon[index]"
                />
            </div>
        </div>
    </div>
</template>

<script>
import GeneralCard from "../../components/Card/General/GeneralCard.vue";
import LoadingComponent from "../../components/Loading/LoadingComponent.vue";
import TitleHeader from "../../components/Title/TitleHeader.vue";
import AlertHelper from "../../helpers/AlertHelper";
import AjaxService from "../../services/AjaxService";

const alert = new AlertHelper();

export default {
    name: "DashboardPage",
    data: function() {
        return {
            isLoading: true,
            datas: [],
            icon: ["users", "book", "exchange-alt", "user-clock"],
            themes: ["success", "info", "warning", "danger"],
        };
    },
    methods: {
        async getData() {
            const vm = this;
            var requestData = {
                method: "DashboardGet",
            };

            AjaxService(
                requestData,
                function({ Values }) {
                    vm.datas = Values;
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
    components: {
        LoadingComponent,
        GeneralCard,
        TitleHeader,
    },
    mounted: function() {
        this.getData();
    },
};
</script>
