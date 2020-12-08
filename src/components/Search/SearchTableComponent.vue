<template>
    <div class="card-header-form">
        <form>
            <div class="input-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                    id="customSearch"
                    v-model="keyword"
                    autocomplete="off"
                />
                <button
                    class="btn btn-info ml-2"
                    @click.prevent="searchkeyword()"
                >
                    Filter
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "SearcTableComponent",
    methods: {
        searchkeyword() {
            this.$emit("searchkeyword", this.keyword);
        },
    },
};
</script>

<style>
#customSearch {
    border-radius: 30px !important;
}
</style>
