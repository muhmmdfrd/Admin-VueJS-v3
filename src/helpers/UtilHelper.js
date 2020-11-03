import moment from "moment";
import defer from "deferred";
import httpRequest from "../services/IndexService";

export default class UtilHelper {
    constructor() {
        // do nothing
    }

    dateNow() {
        return moment();
    }

    getParamsId() {
        const href = window.location.hash;
        const params = href.split('/');
        return params.pop();
    }

    getData(url) {
        const deferred = new defer();

        httpRequest({
            method: 'GET',
            path: url,
            data: {},
            type: 'application/json'
        }).then(function (response) {
            deferred.resolve(response);
        }, function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    addData(url, data) {
        const deferred = new defer();

        httpRequest({
            method: 'POST',
            path: url,
            data: data,
            type: 'application/jon'
        }).then(function (response) {
            deferred.resolve(response)
        }, function (response) {
            deferred.reject(response)
        });

        return deferred.promise;
    }
}