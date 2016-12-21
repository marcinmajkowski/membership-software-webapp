(function () {
    'use strict';

    angular
        .module('payments')
        .controller('CustomerPaymentListController', CustomerPaymentListController);

    CustomerPaymentListController.$inject = ['$mdDialog'];

    function CustomerPaymentListController($mdDialog) {
        var ctrl = this;

        ctrl.editPayment = editPayment;
        ctrl.deletePayment = deletePayment;
        ctrl.whenActive = whenActive;

        // *********************************
        // Internal methods
        // *********************************

        function editPayment(payment, event) {
            ctrl.onEdit && ctrl.onEdit({
                payment: payment,
                event: event
            });
        }

        function deletePayment(payment, event) {
            ctrl.onDelete && ctrl.onDelete({
                payment: payment,
                event: event
            });
        }

        //TODO need better solution
        function whenActive(payment) {
            var startDate = new Date(payment.membershipStartDate);
            startDate.setHours(0,0,0,0);

            var endDate = new Date(payment.membershipEndDate);
            endDate.setHours(0,0,0,0);

            var today = new Date();
            today.setHours(0,0,0,0);

            if (today < startDate) {
                return "future";
            } else if (today <= endDate) {
                return "now";
            } else {
                return "past";
            }
        }
    }

})();