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

        function editPayment(payment) {
            //TODO call callback
        }

        function deletePayment(payment) {
            //TODO call callback
        }

    }

})();