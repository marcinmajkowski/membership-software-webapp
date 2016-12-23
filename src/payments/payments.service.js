(function () {
    'use strict';

    angular
        .module('payments')
        .factory('paymentsService', paymentsService);

    paymentsService.$inject = ['$http', 'apiUrl'];

    function paymentsService($http, apiUrl) {
        var paymentsUrl = apiUrl + '/payments';
        var requestsInProgress = 0;

        var service = {
            getPayments: getPayments,
            getPaymentsByCustomer: getPaymentsByCustomer,
            createPayment: createPayment,
            deletePayment: deletePayment,
            isRequestInProgress: isRequestInProgress
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function getPayments() {
            requestsInProgress++;
            return $http
                .get(paymentsUrl + '?projection=payerAndMembershipPriceAndTimestamp')
                .then(function (response) {
                    requestsInProgress--;
                    return response.data._embedded.payments;
                }, function () {
                    //TODO report error;
                    requestsInProgress--;
                });
        }

        function getPaymentsByCustomer(customer) {
            requestsInProgress++;
            return $http
                .get(customer._links.payments.href)
                .then(function (response) {
                    requestsInProgress--;
                    return response.data._embedded.payments;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function createPayment(newPayment) {
            var paymentToCreate = {
                membershipStartDate: newPayment.membershipStartDate,
                payer: newPayment.payer._links.self.href,
                membership: newPayment.membership._links.self.href
            };

            requestsInProgress++;
            return $http
                .post(paymentsUrl, paymentToCreate)
                .then(function (response) {
                    requestsInProgress--;
                    return response.data;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function deletePayment(payment) {
            return $http.delete(payment._links.self.href);
        }

        function isRequestInProgress() {
            return requestsInProgress != 0;
        }

    }

})();
