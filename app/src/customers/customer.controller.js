(function () {
    'use strict';

    angular
        .module('customers')
        .controller('CustomerController', CustomerController);

    CustomerController.$inject = ['customersService', 'cardsService', 'paymentsService', 'checkInsService', '$location', '$mdDialog', '$routeParams'];

    function CustomerController(customersService, cardsService, paymentsService, checkInsService, $location, $mdDialog, $routeParams) {
        var vm = this;

        vm.toggleEditMode = toggleEditMode;

        vm.customer = {};
        vm.updateCustomer = updateCustomer;
        vm.deleteCustomer = deleteCustomer;

        vm.cards = [];
        vm.newCard = newCard;
        vm.editCard = editCard;
        vm.deleteCard = deleteCard;

        vm.payments = [];
        vm.newPayment = newPayment;

        vm.checkIns = [];
        vm.newCheckIn = newCheckIn;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            customersService
                .readById($routeParams.id)
                .then(function (customer) {
                    vm.customer = customer;
                    loadCards();
                    loadPayments();
                    loadCheckIns();
                }, function () {
                    //TODO report error
                    $location.path('/');
                    return;
                });
        }

        function loadCards() {
            cardsService
                .readCardsByCustomer(vm.customer)
                .then(function (cards) {
                    vm.cards = [].concat(cards);
                });
        }

        function loadPayments() {
            paymentsService
                .getPaymentsByCustomer(vm.customer)
                .then(function (payments) {
                    vm.payments = [].concat(payments);
                });
        }

        function loadCheckIns() {
            checkInsService
                .readCheckInsByCustomer(vm.customer)
                .then(function (checkIns) {
                    vm.checkIns = [].concat(checkIns);
                });
        }

        function toggleEditMode() {
            console.log('TODO toggle edit mode');
        }

        function updateCustomer(ev, oldCustomer, newCustomer) {
            //TODO report error
            customersService
                .updateCustomer(oldCustomer, newCustomer)
                .then(function () {
                    var alert = $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Zmiany zostały pomyślnie zapisane')
                        .ok('Ok')
                        .targetEvent(ev);

                    $mdDialog.show(alert);
                });
        }

        function deleteCustomer(ev, customer) {
            // TODO delete button should go on the left
            var confirm = $mdDialog
                .confirm()
                .title('Czy na pewno chcesz usunąć tego klienta?')
                .textContent('Operacji nie będzie się dało odwrócić.')
                .targetEvent(ev)
                .ok('Usuń')
                .cancel('Anuluj');

            $mdDialog
                .show(confirm)
                .then(function () {
                    customersService
                        .deleteCustomer(customer)
                        .then(function () {
                            $location.path('/');
                        });
                });
        }

        function newCard(ev, owner) {
            var prompt = $mdDialog
                .prompt()
                .title('Nowa karta')
                .textContent('Wpisz numer znajdujący się pod kodem kreskowym na karcie.')
                .placeholder('0000000000000')
                .ariaLabel('Numer karty')
                .targetEvent(ev)
                .ok('Zapisz')
                .cancel('Anuluj');

            $mdDialog
                .show(prompt)
                .then(function (code) {
                    customersService
                        .createCardForCustomerByCode(owner, code)
                        .then(function (newCard) {
                            vm.cards.push(newCard);
                        }, function () {
                            console.log('TODO report card not created error');
                        });
                });
        }

        function deleteCard(card, ev) {
            // TODO delete button should go on the left
            var confirm = $mdDialog
                .confirm()
                .title('Czy na pewno chcesz usunąć tę kartę?')
                .textContent('Operacji nie będzie się dało odwrócić.')
                .targetEvent(ev)
                .ok('Usuń')
                .cancel('Anuluj');

            $mdDialog.show(confirm).then(function () {
                customersService
                    .deleteCardForCustomer(vm.customer, card)
                    .then(function () {
                        var index = vm.cards.indexOf(card);
                        if (index > -1) {
                            vm.cards.splice(index, 1);
                        }
                    });
            });
        }

        function editCard(card) {
            console.log(card);
            console.log('TODO CustomerController.editCard()');
        }

        //TODO this is copied from old customer-payments-list controller (needs update)
        function newPayment(ev) {
            var dialog = {
                targetEvent: ev,
                controller: 'CustomerNewPaymentDialogController',
                templateUrl: 'src/payments/customer-new-payment-dialog.html',
                controllerAs: 'vm'
            };

            $mdDialog
                .show(dialog)
                .then(function (userInput) {
                    var newPayment = {
                        membership: userInput.membership,
                        membershipStartDate: userInput.membershipStartDate,
                        payer: vm.customer
                    };

                    paymentsService
                        .createPayment(newPayment)
                        .then(function (payment) {
                            vm.payments.push(payment);
                        });

                    //TODO report error
                });
        }

        function newCheckIn(ev) {
            //TODO open dialog to select group and payment if multiple available
            var checkInToCreate = {
                timestamp: new Date()
            };

            checkInsService
                .createCheckInForCustomer(checkInToCreate, vm.customer)
                .then(function (checkIn) {
                    vm.checkIns.push(checkIn); // TODO or reload whole list
                });
        }
    }

})();