(function() {
    'use strict';

    angular
        .module('cards')
        .factory('cardsService', cardsService);

    cardsService.$inject = ['$http', 'apiUrl', '$rootScope'];

    function cardsService($http, apiUrl, $rootScope) {
        var cardsUrl = apiUrl + '/cards';
        var requestsInProgress = 0;

        //TODO update card and emit cardEdited
        var service = {
            createCard: createCard,
            readCardsByCustomer: readCardsByCustomer,
            deleteCard: deleteCard,
            isRequestInProgress: inRequestInProgress
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function createCard(card) {
            requestsInProgress++;
            return $http
                .post(cardsUrl, card)
                .then(function(response) {
                    requestsInProgress--;
                    $rootScope.$broadcast('cardCreated');
                    return response.data;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function readCardsByCustomer(customer) {
            requestsInProgress++;
            return $http
                .get(customer._links.cards.href)
                .then(function(response) {
                    requestsInProgress--;
                    return response.data._embedded.cards;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function deleteCard(card) {
            requestsInProgress++;
            return $http
                .delete(card._links.self.href)
                .then(function() {
                    requestsInProgress--;
                    $rootScope.$broadcast('cardDeleted');
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function inRequestInProgress() {
            return requestsInProgress != 0;
        }
    }

})();
