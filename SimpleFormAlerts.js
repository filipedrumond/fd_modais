/* !
 * @author: Filipe Drumond
 * @date: 18/10/2019
 * @version: 1.2.1
 *
 */
require('./JsBsModal');

var $ = require('jquery');
var SimpleFormAlerts;

module.exports = SimpleFormAlerts = {
    optionsDefault: {
        form: "",
        title: "",
        img: false,
        submitText: "Salvar",
        closeCallback: function () { return },
        submitCallback: function () { return }
    },
    alert: function (type, options) {
        options = $.extend({}, this.optionsDefault, options);
        let submit = $(`<button type="button" class="btn btn-primary">`)
            .html(`<span>${options.submitText}</span>`)
            .click(function (e) {
                e.preventDefault();
                $(this).attr("disabled", true);
                if (typeof options.submitCallback === 'function') {
                    modal.on('hidden.bs.modal', function () {
                        options.submitCallback();
                        $(".modal").modal('dispose').remove();
                    });
                } else {
                    console.log("ERRO SIMPLE CONFIRM :: CONFIRM CALLBACK NÃO É UMA FUNÇÃO E NÃO FOI EXECUTADO");
                }
                $(".modal").modal('hide');
            });
        if (typeof options.img === "string" && options.img !== "") {
            options.img = $(`<img src="${options.img}" class="modal-img">`)
        }
        let modal = $.jsBsModal({
            contents: {
                'close': '',
                'modal-title': [options.img, options.title],
                'modal-body': options.form,
                'modal-footer': [
                    submit
                ],
            }
        }).on('hidden.bs.modal', function () {
            if (typeof options.closeCallback === 'function') {
                options.closeCallback();
            } else {
                console.log("ERRO SIMPLE FORM :: closeCallback NÃO É UMA FUNÇÃO E NÃO FOI EXECUTADO");
            }
            $(".modal").modal('dispose').remove();
        });
        modal.find('.modal-content').addClass('form-alert form-alert-' + type);
        return modal;
    },
    success: function (options) {
        return SimpleFormAlerts.alert('success', options);
    },
    info: function (options) {
        return SimpleFormAlerts.alert('info', options);
    },
    warning: function (options) {
        return SimpleFormAlerts.alert('warning', options);
    },
    error: function (options) {
        return SimpleFormAlerts.alert('error', options);
    },
};