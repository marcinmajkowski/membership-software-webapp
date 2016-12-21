(function () {
    'use strict';

    angular
        .module('checkIns')
        .factory('checkInsService', checkInsService);

    checkInsService.$inject = ['$http', 'apiUrl'];

    function checkInsService($http, apiUrl) {
        var checkInsUrl = apiUrl + '/checkIns';

        var service = {
            getCheckIns: getCheckIns,
            createCheckInForCustomer: createCheckInForCustomer,
            deleteCheckIn: deleteCheckIn,
            readCheckInsByCustomer: readCheckInsByCustomer
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function getCheckIns() {
            return $http.get(checkInsUrl).then(function (response) {
                return response.data._embedded.checkIns;
            });
        }

        function createCheckInForCustomer(checkIn, customer) {
            var checkInToCreate = {
                timestamp: checkIn.timestamp,
                customer: customer._links.self.href
            };

            if (checkIn.payment !== null) {
                checkInToCreate.payment = checkIn.payment._links.self.href;
            }

            return $http.post(checkInsUrl, checkInToCreate).then(function (response) {
                return response.data;
            });
        }

        function deleteCheckIn(checkIn) {
            return $http.delete(checkIn._links.self.href);
        }

        function readCheckInsByCustomer(customer) {
            return $http.get(customer._links.checkIns.href).then(function (response) {
                return response.data._embedded.checkIns;
            });
        }

    }

})();
