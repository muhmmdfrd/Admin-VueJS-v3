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

    epochToDate(date) {
        let timestamp = parseInt(date.replace(/[^0-9]/g, ""));
        return moment(timestamp).format("DD-MM-YYYY");
    }

    epochToSqlDate(date) {
        let timestamp = parseInt(date.replace(/[^0-9]/g, ""));
        return moment(timestamp).format("YYYY-MM-DD");
    }
}