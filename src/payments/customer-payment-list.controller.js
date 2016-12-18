(function () {
    'use strict';

    angular
        .module('payments')
        .controller('CustomerPaymentListController', CustomerPaymentListController);

    CustomerPaymentListController.$inject = ['$mdDialog'];

    function CustomerPaymentListController($mdDialog) {
        var ctrl = this;

        ctrl.editPayment = editPayment;
        ctrl.deletePayment = deletePayment;        

        // *********************************
        // Internal methods
        // *********************************

        function editPayment(payment, event) {
            ctrl.onEdit && ctrl.onEdit({
                payment: payment,
                event: event
            });
        }

        function deletePayment(payment, event) {
            ctrl.onDelete && ctrl.onDelete({
                payment: payment,
                event: event
            });
        }

    }

})();