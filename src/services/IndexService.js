import defer from "deferred";
import axios from 'axios';

const baseurl = 'https://jsonplaceholder.typicode.com/';

const httpRequest = function (params) {
    const deferred = new defer();
    const {
        method,
        path,
        data,
        type
    } = params;

    axios({
        method: method,
        url: baseurl + path,
        timeout: deferred.promise,
        header: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': method,
            'Access-Control-Allow-Headers': 'application/json',
            'Content-Type': type,
        },
        data: data
    }).then(function (response) {
            deferred.resolve(response);
        },
        function (response) {
            deferred.reject(response);
        }
    );

    return deferred.promise;
}

export default httpRequest;