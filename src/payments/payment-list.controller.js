(function () {
    'use strict';

    angular
        .module('payments')
        .controller('PaymentListController', PaymentListController);

    PaymentListController.$inject = [];

    function PaymentListController() {
        var ctrl = this;

        ctrl.editPayment = editPayment;
        ctrl.deletePayment = deletePayment;

        // *********************************
        // Internal methods
        // *********************************

        function editPayment(payment) {
            console.log('TODO PaymentListController.editPayment()');
            //TODO call callback
        }

        function deletePayment(payment) {
            console.log('TODO PaymentListController.deletePayment()');
            //TODO call callback
        }

    }

})();