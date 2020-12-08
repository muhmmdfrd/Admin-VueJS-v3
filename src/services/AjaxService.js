import HttpRequest from './IndexService';
import AlertHelper from '../helpers/AlertHelper';

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
                alert.error(result.Message);
            }
        }).catch(function (err) {
            onError(err)
        }).finally(function () {
            onComplete();
        })
}