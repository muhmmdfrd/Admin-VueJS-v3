import HttpRequest from './IndexService';
import AlertHelper from '../helpers/AlertHelper';
import {
    removeToken
} from '../helpers/UtilHelper';

const alert = new AlertHelper();

export default function AjaxService(data, onSuccess, onError, onComplete) {
    HttpRequest(data)
        .then(function ({
            data
        }) {
            const result = data.d;
            if (result.Success) {
                onSuccess(result);
            } else {
                var isValid = validateToken(result.Message);
                isValid ? alert.error(result.Message) : null;
            }
        }).catch(function (err) {
            onError(err)
        }).finally(function () {
            onComplete();
        })
}

function validateToken(message) {
    if (message.toLowerCase().includes('invalid token')) {
        removeToken()
        window.router.push("/");

        return false;
    } else {
        return true;
    }
}