(function () {
    'use strict';

    angular
        .module('checkIns')
        .controller('CheckInsController', CheckInsController);

    CheckInsController.$inject = ['checkInsService'];

    function CheckInsController(checkInsService) {
        var vm = this;

        vm.checkIns = [];
        vm.page = {}
        vm.onPageChange = onPageChange;

        activate();

        function activate() {
            vm.page = {
                size: 10,
                number: 0,
            };

            loadCheckIns();
        }

        function loadCheckIns() {
            checkInsService
                .getCheckInsProjectionPage('customerAndTimestampAndIsPaid', vm.page)
                .then(function (checkInsPage) {
                    vm.checkIns = [].concat(checkInsPage.checkIns);
                    vm.page = checkInsPage.page;
                });
        }

        function onPageChange(changedPage) {
            vm.page = changedPage;
            loadCheckIns();
        }
    }

})();
