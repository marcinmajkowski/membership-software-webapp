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

        function edit(checkIn) {
            //TODO call callback if exists
            console.log('TODO CheckInListController.edit()');
        }

        function remove(checkIn) {
            //TODO call callback if exists
            console.log('TODO CheckInListController.remove()');
        }

    }

})();