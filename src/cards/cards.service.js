(function() {
    'use strict';

    angular
        .module('cards')
        .factory('cardsService', cardsService);

    cardsService.$inject = ['$http', 'apiUrl', '$rootScope'];

    function cardsService($http, apiUrl, $rootScope) {
        var cardsUrl = apiUrl + '/cards';

        //TODO update card and emit cardEdited
        var service = {
            createCard: createCard,
            readCardsByCustomer: readCardsByCustomer,
            deleteCard: deleteCard
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function createCard(card) {
            return $http
                .post(cardsUrl, card)
                .then(function(response) {
                    $rootScope.$broadcast('cardCreated');
                    return response.data;
                });
        }

        function readCardsByCustomer(customer) {
            return $http
                .get(customer._links.cards.href)
                .then(function(response) {
                    return response.data._embedded.cards;
                });
        }

        function deleteCard(card) {
            return $http
                .delete(card._links.self.href)
                .then(function() {
                    $rootScope.$broadcast('cardDeleted');
                });
        }
    }

})();
