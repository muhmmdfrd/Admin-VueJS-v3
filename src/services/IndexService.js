import defer from "deferred";
import axios from 'axios';
import {
    getToken
} from "../helpers/UtilHelper";

const baseurl = 'http://ws.first.local/MathService.asmx/Call';

export default function httpRequest(data) {
    const deferred = new defer();

    // get token and add exeption for login
    data.token = data.method == "Login" ? "null" : getToken();

    axios({
        method: 'POST',
        url: baseurl,
        timeout: deferred.promise,
        data: {
            data
        },
        header: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
    }).then(function (response) {
            deferred.resolve(response);
        },
        function (response) {
            deferred.reject(response);
        }
    );

    return deferred.promise;
}