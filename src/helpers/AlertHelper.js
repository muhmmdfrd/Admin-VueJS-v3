import toastr from "toastr";

export default class AlertHelper {
    constructor() {
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: false,
            progressBar: true,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
        }
    }

    success(message) {
        toastr["success"](message, "Success");
    }

    error(message) {
        toastr["error"](message, "Error!");
    }

    confirm() {
        toastr.warning("<br /><button class='btn btn-primary' type='button' value='yes'>Yes</button><button class='btn btn-secondary' type='button'  value='no' >No</button>", 'Are you sure you want to delete this item?', {
            allowHtml: true,
            onclick: function (toast) {
                console.log(toast);
            }

        })
    }
}