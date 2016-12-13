(function () {
    'use strict';

    angular
        .module('payments')
        .component('msCustomerPaymentList', {
            templateUrl: "src/payments/view/customer-payment-list.html",
            controller: 'CustomerPaymentListController',
            bindings: {
                payments: '<msPayments'
            }
        });

})();