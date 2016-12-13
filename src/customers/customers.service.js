(function () {
    'use strict';

    angular
        .module('customers')
        .factory('customersService', customersService);

    customersService.$inject = ['$http', 'apiUrl', 'cardsService', '$rootScope'];

    function customersService($http, apiUrl, cardsService, $rootScope) {
        var customersUrl = apiUrl + '/customers';

        var service = {
            readById: readById,
            createCustomer: createCustomer,
            createCardForCustomerByCode: createCardForCustomerByCode,
            updateCustomer: updateCustomer,
            deleteCustomer: deleteCustomer,
            deleteCardForCustomer: deleteCardForCustomer, //TODO seems like it doesn't fit here
            //TODO better naming
            getCustomersProjection: getCustomersProjection
        };

        activate();

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
        }

        function readById(id) {
            return $http.get(customersUrl + '/' + id).then(function (response) {
                return response.data;
            });
        }

        function createCustomer(customer) {
            return $http.post(customersUrl, customer).then(function (response) {
                //TODO pass data to event
                $rootScope.$broadcast('customerCreated');
            });
        }

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
            return $http.patch(oldCustomer._links.self.href, newCustomer).then(function (response) {
                var updatedCustomer = response.data;
                //TODO pass data to event
                $rootScope.$broadcast('customerUpdated');
                return updatedCustomer;
            });
        }

        function deleteCustomer(customer) {
            return $http.delete(customer._links.self.href).then(function () {
                //TODO pass data to event
                $rootScope.$broadcast('customerDeleted');
            });
        }

        function deleteCardForCustomer(customer, card) {
            return cardsService.deleteCard(card).then(function () {
                //TODO emit event to update sidebar
            });
        }

        function getCustomersProjection(projection) {
            return $http.get(customersUrl + '?projection=' + projection).then(function (response) {
                return response.data._embedded.customers;
            });
        }

    }

})();
