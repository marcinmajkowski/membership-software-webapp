(function () {
    'use strict';

    angular
        .module('payments')
        .controller('PaymentsController', PaymentsController);

    PaymentsController.$inject = ['paymentsService'];

    //TODO pagination
    function PaymentsController(paymentsService) {
        var vm = this;

        vm.payments = [];
        vm.newPayment = newPayment;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            paymentsService.getPayments().then(function (payments) {
                vm.payments = [].concat(payments);
            });
        }

        function newPayment() {
            console.log('TODO PaymentsController.newPayment()');
        }
    }

})();
