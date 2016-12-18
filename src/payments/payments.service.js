(function () {
    'use strict';

    angular
        .module('payments')
        .factory('paymentsService', paymentsService);

    paymentsService.$inject = ['$http', 'apiUrl'];

    function paymentsService($http, apiUrl) {
        var paymentsUrl = apiUrl + '/payments';

        var service = {
            getPayments: getPayments,
            getPaymentsByCustomer: getPaymentsByCustomer,
            createPayment: createPayment,
            deletePayment: deletePayment
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function getPayments() {
            return $http.get(paymentsUrl + '?projection=payerAndMembershipPriceAndTimestamp').then(function (response) {
                return response.data._embedded.payments;
            });
        }

        function getPaymentsByCustomer(customer) {
            return $http.get(customer._links.payments.href).then(function (response) {
                return response.data._embedded.payments;
            });
        }

        function createPayment(newPayment) {
            var paymentToCreate = {
                membershipStartDate: newPayment.membershipStartDate,
                payer: newPayment.payer._links.self.href,
                membership: newPayment.membership._links.self.href
            };

            console.log(paymentToCreate);

            return $http.post(paymentsUrl, paymentToCreate).then(function (response) {
                return response.data;
            });
        }

        function deletePayment(payment) {
            return $http.delete(payment._links.self.href);
        }

    }

})();
