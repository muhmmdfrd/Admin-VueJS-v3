function getDataLogin() {
    var data = JSON.parse(window.localStorage.getItem("_tin"));
    return data === null ? window.router.push('/') : data;
}

function getDataMenu() {
    return JSON.parse(window.localStorage.getItem("_min"));
}

const getMenu = function () {
    return getDataMenu();
}

const getToken = function () {
    const isValid = validateModel(getDataLogin());
    return isValid ? getDataLogin().Token : null;
}

const getUname = function () {
    return getDataLogin().Username;
}

const getRoleId = function () {
    return getDataLogin().RoleId;
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
const currency = function (data) {
    const result = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'IDR'
    }).format(data);

    return result.replace("IDR", "Rp");
}

export {
    currency,
    getToken,
    getUname,
    getRoleId,
    getMenu,
    removeToken,
    getParamsId,
    validateModel
}