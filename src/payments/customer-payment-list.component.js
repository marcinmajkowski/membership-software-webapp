(function () {
    'use strict';

    angular
        .module('payments')
        .component('msCustomerPaymentList', {
            templateUrl: "src/payments/customer-payment-list.html",
            controller: 'CustomerPaymentListController',
            bindings: {
                payments: '<msPayments',
                onDelete: '&?msOnDelete',
                onEdit: '&?msOnEdit'
            }
        });

})();