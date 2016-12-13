(function () {
    'use strict';

    angular
        .module('payments')
        .component('msPaymentList', {
            templateUrl: "src/payments/view/payment-list.html",
            controller: 'PaymentListController',
            bindings: {
                payments: '<msPayments'
            }
        });

})();