(function () {
    'use strict';

    angular
        .module('payments')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['paymentsService', '$location', '$mdDialog', '$routeParams'];

    function PaymentController(paymentsService, $location, $mdDialog, $routeParams) {
        var vm = this;

        vm.payment = {};

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            //TODO refactor
            paymentsService
                .readById($routeParams.id)
                .then(function (payment) {
                    vm.payment = payment;
                    paymentsService
                        .getPayerByPayment(payment)
                        .then(function (payer) {
                            payment.payer = payer;
                        });
                }, function () {
                    //TODO report error
                    $location.path('/');
                    return;
                });
        }
    }

})();