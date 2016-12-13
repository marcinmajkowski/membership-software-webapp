(function () {
    'use strict';

    angular
        .module('payments')
        .component('msPaymentsList', {
            templateUrl: "src/payments/view/payments-list.html",
            controller: 'PaymentsListController',
            bindings: {
                payments: '<msPayments'
            }
        });

})();