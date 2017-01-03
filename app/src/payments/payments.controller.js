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
        vm.page = {}
        vm.onPageChange = onPageChange;
        vm.newPayment = newPayment;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            vm.page = {
                size: 10,
                number: 0,
            };

            loadPayments();
        }

        function loadPayments() {
            paymentsService
                .getPaymentsProjectionPage('payerAndMembershipPriceAndTimestamp', vm.page)
                .then(function (paymentsPage) {
                    vm.payments = [].concat(paymentsPage.payments);
                    vm.page = paymentsPage.page;
                });
        }

        function newPayment() {
            console.log('TODO PaymentsController.newPayment()');
        }

        function onPageChange(changedPage) {
            vm.page = changedPage;
            loadPayments();
        }
    }

})();
