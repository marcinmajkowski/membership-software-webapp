(function () {
    'use strict';

    angular
        .module('checkIns')
        .factory('checkInsService', checkInsService);

    checkInsService.$inject = ['$http', 'apiUrl'];

    function checkInsService($http, apiUrl) {
        var checkInsUrl = apiUrl + '/checkIns';
        var requestsInProgress = 0;

        var service = {
            getCheckIns: getCheckIns,
            createCheckInForCustomer: createCheckInForCustomer,
            deleteCheckIn: deleteCheckIn,
            readCheckInsByCustomer: readCheckInsByCustomer,
            isRequestInProgress: isRequestInProgress
        };

        return service;

        // *********************************
        // Internal methods
        // *********************************

        function getCheckIns() {
            requestsInProgress++;
            return $http
                .get(checkInsUrl + '/?sort=timestamp,desc')
                .then(function (response) {
                    requestsInProgress--;
                    return response.data._embedded.checkIns;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
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

            requestsInProgress++;
            return $http
                .post(checkInsUrl, checkInToCreate)
                .then(function (response) {
                    requestsInProgress--;
                    return response.data;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function deleteCheckIn(checkIn) {
            requestsInProgress++;
            return $http
                .delete(checkIn._links.self.href)
                .then(function () {
                    requestsInProgress--;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function readCheckInsByCustomer(customer, pagination) {
            var params = {
                customer: customer._links.self.href,
                sort: 'timestamp,desc',
                size: pagination.size,
                page: pagination.page
            };
            requestsInProgress++;
            return $http
                .get(checkInsUrl + '/search/findByCustomer/', { params: params })
                .then(function (response) {
                    requestsInProgress--;
                    return response.data._embedded.checkIns;
                }, function () {
                    //TODO report error
                    requestsInProgress--;
                });
        }

        function isRequestInProgress() {
            return requestsInProgress != 0;
        }

    }

})();
