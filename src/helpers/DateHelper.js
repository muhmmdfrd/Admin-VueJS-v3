import moment from 'moment';

const now = function () {
    return moment();
}

const epoch = function (args) {
    return parseInt(args.replace(/[^0-9]/g, ""));
}

const epochToDate = function (date) {
    return moment(epoch(date)).format("DD-MM-YYYY");
}

const epochToSqlDate = function (date) {
    return moment(epoch(date)).format("YYYY-MM-DD");
}

const epochCompare = function (date) {
    const dateParams = epoch(date);
    const dateNow = now();

    return moment(dateParams).isSame(dateNow) || moment(dateParams).isAfter(dateNow);
}

const dateDiff = function (date) {
    return moment(now()).diff(epoch(date), 'days');
}

export {
    now,
    dateDiff,
    epoch,
    epochToDate,
    epochToSqlDate,
    epochCompare
};