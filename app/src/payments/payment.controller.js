(function () {
    'use strict';

    angular
        .module('payments')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['paymentsService', 'checkInsService', '$location', '$mdDialog', '$routeParams'];

    function PaymentController(paymentsService, checkInsService, $location, $mdDialog, $routeParams) {
        var vm = this;

        vm.payment = {};

        vm.checkIns = [];
        vm.isCheckInsRequestInProgress = checkInsService.isRequestInProgress;
        vm.newCheckIn = newCheckIn;
        vm.editCheckIn = editCheckIn;
        vm.deleteCheckIn = deleteCheckIn;

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
                            loadCheckIns();
                        }, function () {
                            //TODO report error
                            //TODO refactor
                            $location.path('/');
                            return;
                        });
                }, function () {
                    //TODO report error
                    $location.path('/');
                    return;
                });
        }

        function loadCheckIns() {
            checkInsService
                .readCheckInsByPayment(vm.payment)
                .then(function (checkIns) {
                    vm.checkIns = [].concat(checkIns);
                }, function () {
                    //TODO report error
                });
        }

        function newCheckIn(event) {
            console.log('TODO PaymentController.newCheckIn()');
        }

        function editCheckIn(checkIn, event) {
            console.log('TODO PaymentController.editCheckIn()');
        }

        function deleteCheckIn(checkIn, event) {
            console.log('TODO PaymentController.deleteCheckIn()');
        }

    }

})();