const getToken = function () {
    return window.localStorage.getItem("_tin");
}

const removeToken = function () {
    window.localStorage.clear();
}

const validateModel = function (data) {
    return data != null || data != undefined;
}

const getParamsId = function () {
    const href = window.location.hash;
    const params = href.split('/');
    return Number(params.pop());
}

const removeArrOfObj = function (array, property) {
    array.map((value) => delete value[property]);
}

export {
    getToken,
    removeToken,
    getParamsId,
    validateModel,
    removeArrOfObj
}