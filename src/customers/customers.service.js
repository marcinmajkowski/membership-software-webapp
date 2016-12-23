(function () {
    'use strict';

    angular
        .module('customers')
        .factory('customersService', customersService);

    customersService.$inject = ['$http', 'apiUrl', 'cardsService', '$rootScope'];

    function customersService($http, apiUrl, cardsService, $rootScope) {
        var customersUrl = apiUrl + '/customers';
        //TODO probably some kind of interceptor would be more suitable
        var requestsInProgress = 0;

        var service = {
            readById: readById,
            createCustomer: createCustomer,
            createCardForCustomerByCode: createCardForCustomerByCode,
            updateCustomer: updateCustomer,
            deleteCustomer: deleteCustomer,
            //TODO better naming
            getCustomersProjection: getCustomersProjection,
            isRequestInProgress: isRequestInProgress
        };

        activate();

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
        }

        function readById(id) {
            requestsInProgress++;
            return $http
                .get(customersUrl + '/' + id)
                .then(function (response) {
                    requestsInProgress--;
                    return response.data;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function createCustomer(customer) {
            requestsInProgress++;
            return $http
                .post(customersUrl, customer)
                .then(function (response) {
                    requestsInProgress--;
                    //TODO pass data to event
                    $rootScope.$broadcast('customerCreated');
                    return response.data;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        //TODO remove?
        function createCardForCustomerByCode(customer, code) {
            var cardToCreate = {
                code: code,
                issueTimestamp: new Date(),
                owner: customer._links.self.href
            };

            return cardsService.createCard(cardToCreate).then(function (createdCard) {
                //TODO emit event to update sidebar
                return createdCard;
            });
        }

        function updateCustomer(oldCustomer, newCustomer) {
            requestsInProgress++;
            return $http
                .patch(oldCustomer._links.self.href, newCustomer)
                .then(function (response) {
                    requestsInProgress--;
                    var updatedCustomer = response.data;
                    //TODO pass data to event
                    $rootScope.$broadcast('customerUpdated');
                    return updatedCustomer;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function deleteCustomer(customer) {
            requestsInProgress++;
            return $http
                .delete(customer._links.self.href)
                .then(function () {
                    requestsInProgress--;
                    //TODO pass data to event
                    $rootScope.$broadcast('customerDeleted');
                }, function () {
                    //TODO report erorr
                    requestsInProgress--;
                });
        }

        function getCustomersProjection(projection) {
            requestsInProgress++;
            return $http
                .get(customersUrl + '?projection=' + projection)
                .then(function (response) {
                    requestsInProgress--;
                    return response.data._embedded.customers;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function isRequestInProgress() {
            return requestsInProgress != 0;
        }
    }

})();
