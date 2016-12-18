(function () {
    'use strict';

    angular
        .module('cards')
        .controller('CardListController', CardListController);

    CardListController.$inject = [];

    function CardListController() {
        var ctrl = this;

        ctrl.editCard = editCard;
        ctrl.deleteCard = deleteCard;

        function editCard(card, event) {
            ctrl.onEdit && ctrl.onEdit({
                card: card,
                event: event
            });
        }

        function deleteCard(card, event) {
            ctrl.onDelete && ctrl.onDelete({
                card: card,
                event: event
            });
        }

    }

})();