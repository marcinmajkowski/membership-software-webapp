(function () {
    'use strict';

    angular
        .module('cards')
        .controller('CardListController', CardListController);

    CardListController.$inject = [];

    function CardListController() {
        var ctrl = this;

        ctrl.edit = edit;
        ctrl.remove = remove;

        function edit(card) {
            ctrl.onEdit && ctrl.onEdit({ card: card });
        }

        function remove(card, event) {
            ctrl.onDelete && ctrl.onDelete({
                card: card,
                event: event
            });
        }

    }

})();