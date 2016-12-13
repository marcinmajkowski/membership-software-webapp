(function () {
    'use strict';

    angular
        .module('payments')
        .controller('PaymentsListController', PaymentsListController);

    PaymentsListController.$inject = [];

    function PaymentsListController() {
        var ctrl = this;

        ctrl.editPayment = editPayment;
        ctrl.deletePayment = deletePayment;

        // *********************************
        // Internal methods
        // *********************************

        function editPayment(payment) {
            console.log('TODO PaymentsListController.editPayment()');
            //TODO call callback
        }

        function deletePayment(payment) {
            console.log('TODO PaymentsListController.deletePayment()');
            //TODO call callback
        }

    }

})();