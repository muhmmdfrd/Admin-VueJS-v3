import moment from "moment";

export default class UtilHelper {
    constructor() {
        /* do nothing */
    }

    dateNow() {
        return moment();
    }

    validateModel(data) {
        return data != null || data != undefined;
    }

    getParamsId() {
        const href = window.location.hash;
        const params = href.split('/');
        return params.pop();
    }

    epoch(data) {
        return parseInt(data.replace(/[^0-9]/g, ""));
    }

    epochToDate(date) {
        return moment(this.epoch(date)).format("DD-MM-YYYY");
    }

    epochToSqlDate(date) {
        return moment(this.epoch(date)).format("YYYY-MM-DD");
    }
}