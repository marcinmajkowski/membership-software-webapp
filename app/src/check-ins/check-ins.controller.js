(function () {
    'use strict';

    angular
        .module('checkIns')
        .controller('CheckInsController', CheckInsController);

    CheckInsController.$inject = ['checkInsService'];

    function CheckInsController(checkInsService) {
        var vm = this;

        vm.checkIns = [];

        activate();

        function activate() {
            checkInsService
                .getCheckIns()
                .then(function (checkIns) {
                    vm.checkIns = [].concat(checkIns);
                });
        }
    }

})();
