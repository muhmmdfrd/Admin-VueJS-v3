function getDataLogin() {
    return JSON.parse(window.localStorage.getItem("_tin"));
}

const getToken = function () {
    return getDataLogin().Token;
}

const getUname = function () {
    return getDataLogin().Username;
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
    getUname,
    removeToken,
    getParamsId,
    validateModel,
    removeArrOfObj
}