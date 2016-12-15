(function () {
    'use strict';

    angular
        .module('checkIns')
        .controller('NewCheckInDialogController', NewCheckInDialogController);

    NewCheckInDialogController.$inject = ['$mdDialog', 'customer'];

    function NewCheckInDialogController($mdDialog, customer) {
        var vm = this;

        vm.save = $mdDialog.hide;
        vm.cancel = $mdDialog.cancel;
        vm.userInput = {};

        // *********************************
        // Internal methods
        // *********************************

        //TODO submit user input on enter key
        //TODO validation
    }

})();