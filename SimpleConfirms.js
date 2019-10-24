/* !
 * @author: Filipe Drumond
 * @date: 05/09/2019
 * @version: 1.0.0
 *
 */
require('./JsBsModal');
var SimpleAlerts = require('./SimpleAlerts');

var $ = require('jquery');
var SimpleConfirms;

module.exports = SimpleConfirms = {
    optionsDefault: {
        text: "",
        title: "",
        img: "",
        confirmText: "Sim",
        negateText: "Não",
        successText: "Sucesso",
        confirmCallback: function () { return },
        negateCallback: function () { return }
    },
    confirm: function (type, options) {
        options = $.extend({}, this.optionsDefault, options);
        /**
         * @todo Melhorar estes IFs
         */
        if (options.img !== "") {
            options.img = $(`<img class="modal-img" src="${options.img}">`);
        }

        var btnConfirm = $('<button type="button" class="btn btn-primary">')
            .html(`<span>${options.confirmText}</span>`).click(function (e) {
                e.preventDefault();                
                $(this).attr("disabled", true);
                if (typeof options.confirmCallback === 'function') {
                    options.confirmCallback();
                } else {
                    console.log("ERRO SIMPLE CONFIRM :: CONFIRM CALLBACK NÃO É UMA FUNÇÃO E NÃO FOI EXECUTADO");
                }
            });

        var btnNegate = $('<button type="button" class="btn btn-secondary" data-dismiss="modal">')
            .html(`<span>${options.negateText}</span>`).click(function () {
                if (typeof options.negateCallback === 'function') {
                    options.negateCallback();
                } else {
                    console.log("ERRO SIMPLE CONFIRM :: NEGATE CALLBACK NÃO É UMA FUNÇÃO E NÃO FOI EXECUTADO");
                }
            });

        var modal = $.jsBsModal({
            contents: {
                'close': false,
                'modal-title': [options.img, options.title],
                'modal-body': options.text,
                'modal-footer': [
                    btnNegate, btnConfirm
                ],
            }
        }).on('hidden.bs.modal', function () {
            modal.modal('dispose').remove();
        });

        modal.find('.modal-content').addClass('confirm confirm-' + type);

        return modal;
    },
    success: function (options) {
        return SimpleConfirms.confirm('success', options);
    },
    info: function (options) {
        return SimpleConfirms.confirm('info', options);
    },
    warning: function (options) {
        return SimpleConfirms.confirm('warning', options);
    },
    error: function (options) {
        return SimpleConfirms.confirm('error', options);
    },
};