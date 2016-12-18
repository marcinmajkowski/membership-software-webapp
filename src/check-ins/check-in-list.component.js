(function () {
    'use strict';

    angular
        .module('checkIns')
        .component('msCheckInList', {
            templateUrl: "src/check-ins/check-in-list.html",
            controller: 'CheckInListController',
            bindings: {
                checkIns: '<msCheckIns',
                onDelete: '&?msOnDelete',
                onEdit: '&?msOnEdit'
            }
        });

})();