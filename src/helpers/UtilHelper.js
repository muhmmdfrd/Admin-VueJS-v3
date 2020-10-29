import moment from "moment";
import {
    database
} from "../configurations/firebaseConfig";
import defer from "deferred";

export default class UtilHelper {
    constructor() {
        // do nothing
    }

    dateNow() {
        return moment();
    }

    getData() {
        const deferred = new defer();
        const {
            resolve,
            reject,
            promise
        } = deferred;

        database
            .collection("account")
            .doc("BzRGoFJ2BRd6FCZgapbu")
            .get()
            .then(function (response) {
                if (response.exists) {
                    resolve(response);
                }
            }, function (response) {
                reject(response);
            })
            .catch(function (err) {
                console.log(err);
            })

        return promise;
    }
}