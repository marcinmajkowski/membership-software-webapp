(function () {
    'use strict';

    angular
        .module('customers')
        .controller('CustomerController', CustomerController);

    CustomerController.$inject = ['customersService', 'cardsService', 'paymentsService', '$location', '$mdDialog', '$routeParams'];

    function CustomerController(customersService, cardsService, paymentsService, $location, $mdDialog, $routeParams) {
        var vm = this;

        vm.customersService = customersService;
        vm.toggleEditMode = toggleEditMode;
        vm.updateCustomer = updateCustomer;
        vm.deleteCustomer = deleteCustomer;
        vm.customer = {};
        vm.cards = []; //TODO move cards stuff to directive (just as payments)
        vm.newCard = newCard;
        vm.deleteCard = deleteCard;
        vm.editCard = editCard;
        vm.payments = [];

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            customersService.readById($routeParams.id).then(function (customer) {
                vm.customer = customer;
                loadCustomerCards(vm.customer);
                loadCustomerPayments(vm.customer);
            }, function () {
                //TODO report error
                $location.path('/');
                return;
            });

            function loadCustomerCards(customer) {
                cardsService.readCardsByCustomer(customer).then(function (cards) {
                    vm.cards = [].concat(cards);
                });
            }

            function loadCustomerPayments(customer) {
                paymentsService.getPaymentsByCustomer(customer).then(function (payments) {
                    vm.payments = [].concat(payments);
                });
            }
        }

        function toggleEditMode() {
            console.log('TODO toggle edit mode');
        }

        function updateCustomer(ev, oldCustomer, newCustomer) {
            //TODO report error
            customersService.updateCustomer(oldCustomer, newCustomer).then(function () {
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
            var confirm = $mdDialog.confirm()
                .title('Czy na pewno chcesz usunąć tego klienta?')
                .textContent('Operacji nie będzie się dało odwrócić.')
                .targetEvent(ev)
                .ok('Usuń')
                .cancel('Anuluj');

            $mdDialog.show(confirm).then(function () {
                customersService.deleteCustomer(customer).then(function () {
                    $location.path('/');
                });
            });
        }

        function newCard(ev, owner) {
            var prompt = $mdDialog.prompt()
                .title('Nowa karta')
                .textContent('Wpisz numer znajdujący się pod kodem kreskowym na karcie.')
                .placeholder('0000000000000')
                .ariaLabel('Numer karty')
                .targetEvent(ev)
                .ok('Zapisz')
                .cancel('Anuluj');

            $mdDialog.show(prompt).then(function (code) {
                customersService.createCardForCustomerByCode(owner, code).then(function (newCard) {
                    vm.cards.push(newCard);
                }, function () {
                    console.log('TODO report card not created error');
                });
            });
        }

        function deleteCard(ev, customer, card) {
            // TODO delete button should go on the left
            var confirm = $mdDialog.confirm()
                .title('Czy na pewno chcesz usunąć tę kartę?')
                .textContent('Operacji nie będzie się dało odwrócić.')
                .targetEvent(ev)
                .ok('Usuń')
                .cancel('Anuluj');

            $mdDialog.show(confirm).then(function () {
                customersService.deleteCardForCustomer(customer, card).then(function () {
                    var index = vm.cards.indexOf(card);
                    if (index > -1) {
                        vm.cards.splice(index, 1);
                    }
                });
            });
        }

        function editCard(card) {
            console.log(card);
            console.log('TODO edit card');
        }
    }

})();