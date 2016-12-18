(function () {
    'use strict';

    angular
        .module('checkIns')
        .controller('CheckInListController', CheckInListController);

    CheckInListController.$inject = [];

    function CheckInListController() {
        var ctrl = this;

        ctrl.edit = edit;
        ctrl.remove = remove;

        function edit(checkIn, event) {
            ctrl.onEdit && ctrl.onEdit({
                checkIn: checkIn,
                event: event
            });
        }

        function remove(checkIn, event) {
            ctrl.onDelete && ctrl.onDelete({
                checkIn: checkIn,
                event: event
            });
        }

    }

})();