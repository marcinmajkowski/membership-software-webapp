(function () {
    'use strict';

    angular
        .module('customers')
        .controller('CustomerController', CustomerController);

    CustomerController.$inject = ['customersService', 'cardsService', 'paymentsService', 'checkInsService', '$location', '$mdDialog', '$routeParams'];

    //TODO add indicator if there are unsaved changes
    function CustomerController(customersService, cardsService, paymentsService, checkInsService, $location, $mdDialog, $routeParams) {
        var vm = this;

        vm.toggleEditMode = toggleEditMode;

        vm.customer = {};
        vm.updateCustomer = updateCustomer;
        vm.deleteCustomer = deleteCustomer;

        vm.cards = [];
        vm.isCardsRequestInProgress = cardsService.isRequestInProgress;
        vm.newCard = newCard;
        vm.editCard = editCard;
        vm.deleteCard = deleteCard;

        vm.payments = [];
        vm.isPaymentsRequestInProgress = paymentsService.isRequestInProgress;
        vm.newPayment = newPayment;
        //TODO probably should handle editing inside component and call update here
        vm.editPayment = editPayment;
        vm.deletePayment = deletePayment;
        vm.paymentsPagination = { size: 3, page: 0 };
        vm.showMorePayments = showMorePayments;
        vm.isMorePayments = true;

        vm.checkIns = [];
        vm.isCheckInsRequestInProgress = checkInsService.isRequestInProgress;
        vm.newCheckIn = newCheckIn;
        vm.editCheckIn = editCheckIn;
        vm.deleteCheckIn = deleteCheckIn;
        vm.checkInsPagination = { size: 6, page: 0 };
        vm.showMoreCheckIns = showMoreCheckIns;
        vm.isMoreCheckIns = true;

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
                }, function () {
                    //TODO report error
                });
        }

        function loadPayments() {
            paymentsService
                .getPaymentsByCustomer(vm.customer, vm.paymentsPagination)
                .then(function (payments) {
                    vm.payments = [].concat(payments);
                    //TODO with fixed showMorePayments() following will no longer be valid
                    //TODO use page.totalElements from /payments response
                    vm.isMorePayments = vm.paymentsPagination.size == payments.length;
                }, function () {
                    //TODO report error
                });
        }

        function loadCheckIns() {
            checkInsService
                .readCheckInsByCustomer(vm.customer, vm.checkInsPagination)
                .then(function (checkIns) {
                    vm.checkIns = [].concat(checkIns);
                    //TODO with fixed showMoreCheckIns() following will no longer be valid
                    //TODO use page.totalElements from /checkIns response
                    vm.isMoreCheckIns = vm.checkInsPagination.size == checkIns.length;
                }, function () {
                    //TODO report error
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
                //TODO set maximum length to 12
                .placeholder('00000000000000')
                .ariaLabel('Numer karty')
                .targetEvent(ev)
                .ok('Zapisz')
                .cancel('Anuluj');

            $mdDialog
                .show(prompt)
                .then(function (code) {
                    var pad = "000000000000";
                    var paddedCode = pad.substring(0, pad.length - code.length) + code;
                    customersService
                        .createCardForCustomerByCode(owner, paddedCode)
                        .then(function (newCard) {
                            loadCards();
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
                cardsService
                    .deleteCard(card)
                    .then(function () {
                        loadCards();
                    });
            });
        }

        function editCard(card, event) {
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
                            loadPayments();
                        });

                    //TODO report error
                });
        }

        function editPayment(payment, event) {
            console.log('TODO CustomerController.editPayment()');
        }

        //FIXME cannot delete payments with check-ins. Don't know yet how to handle it
        //TODO view in which user can delete relation to payment all check-ins
        //TODO toast with error info
        function deletePayment(payment, event) {
            // TODO delete button should go on the left
            var confirm = $mdDialog
                .confirm()
                .title('Czy na pewno chcesz usunąć tę płatność?')
                .textContent('Operacji nie będzie się dało odwrócić.')
                .targetEvent(event)
                .ok('Usuń')
                .cancel('Anuluj');

            $mdDialog.show(confirm).then(function () {
                paymentsService
                    .deletePayment(payment)
                    .then(function () {
                        loadPayments();
                    });
            });
        }

        //TODO do not load all payments again, increase page instead
        function showMorePayments() {
            vm.paymentsPagination.size += 3;
            loadPayments();
        }

        function newCheckIn(ev) {
            //TODO open dialog to select group and payment if multiple available
            var checkInToCreate = {
                timestamp: new Date(),
                payment: getCheckInPayment()
            };

            checkInsService
                .createCheckInForCustomer(checkInToCreate, vm.customer)
                .then(function (checkIn) {
                    loadCheckIns();
                    //TODO
                    if (checkIn.paid) {
                        loadPayments();
                    }
                });
        }

        function editCheckIn(checkIn, event) {
            console.log('TODO CustomerController.editCheckIn()');
        }

        function deleteCheckIn(checkIn, event) {
            // TODO delete button should go on the left
            var confirm = $mdDialog
                .confirm()
                .title('Czy na pewno chcesz usunąć to wejście?')
                .textContent('Operacji nie będzie się dało odwrócić.')
                .targetEvent(event)
                .ok('Usuń')
                .cancel('Anuluj');

            $mdDialog.show(confirm).then(function () {
                checkInsService
                    .deleteCheckIn(checkIn)
                    .then(function () {
                        loadCheckIns();
                        if (checkIn.paid) {
                            loadPayments();
                        }
                    });
            });
        }

        //TODO do not load all checkIns again, increase page instead
        function showMoreCheckIns() {
            vm.checkInsPagination.size += 6;
            loadCheckIns();
        }

        /**
         * If customer has active payments with open access, the one ending
         * the earliest is returned. If there are no active payments with open
         * access, the earliest ending active payment with check-ins left is
         * returned. If there are no active payments, null is returned. 
         */
        //FIXME use service to get proper payment since vm.payments no longer
        //FIXME contain all available payments!
        function getCheckInPayment() {
            var activePayments = vm.payments.filter(isPaymentActive);

            var openAccessPayments = activePayments.filter(isPaymentOpenAccess);
            if (openAccessPayments.length > 0) {
                //TODO no sort necessary - need the smallest element only
                return openAccessPayments.sort(comparePaymentEndDates)[0];
            }

            var validPayments = activePayments.filter(hasPaymentCheckInsLeft);
            if (validPayments.length > 0) {
                //TODO no sort necessary - need the smallest element only
                return validPayments.sort(comparePaymentEndDates)[0];
            }

            return null;
        }

        //FIXME returned order is probably incorrect
        function comparePaymentEndDates(paymentA, paymentB) {
            return new Date(paymentA.membershipEndDate) - new Date(paymentB.membershipEndDate);
        }

        function hasPaymentCheckInsLeft(payment) {
            // membershipNumberOfTrainings = -1 indicates no limit
            return payment.membershipNumberOfTrainings < 0 || payment.membershipNumberOfTrainings > payment.checkInsSize;
        }

        function isPaymentOpenAccess(payment) {
            return payment.membershipNumberOfTrainings < 0;
        }

        function isPaymentActive(payment) {
            var startDate = new Date(payment.membershipStartDate);
            startDate.setHours(0, 0, 0, 0);

            var endDate = new Date(payment.membershipEndDate);
            endDate.setHours(0, 0, 0, 0);

            var today = new Date();
            today.setHours(0, 0, 0, 0);

            return today <= endDate && today >= startDate;
        }
    }

})();