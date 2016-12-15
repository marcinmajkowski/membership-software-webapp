(function () {
    'use strict';

    angular
        .module('cards')
        .component('msCardList', {
            templateUrl: "src/cards/card-list.html",
            controller: 'CardListController',
            bindings: {
                cards: '<msCards',
                onDelete: '&?msOnDelete',
                onEdit: '&?msOnEdit'
            }
        });

})();