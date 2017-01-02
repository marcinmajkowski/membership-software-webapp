(function () {
    'use strict';

    angular
        .module('membershipSoftwareRoute', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/payments', {
                    templateUrl: 'src/payments/payments.html',
                    controller: 'PaymentsController',
                    controllerAs: 'vm'
                })
                .when('/payments/:id', {
                    templateUrl: 'src/payments/payment.html',
                    controller: 'PaymentController',
                    controllerAs: 'vm'
                })
                .when('/check-ins', {
                    templateUrl: 'src/check-ins/check-ins.html',
                    controller: 'CheckInsController',
                    controllerAs: 'vm'
                })
                .when('/customers', {
                    templateUrl: 'src/customers/customers.html'
                })
                .when('/customers/:id', {
                    templateUrl: 'src/customers/customer.html',
                    controller: 'CustomerController',
                    controllerAs: 'vm'
                })
                .when('/new-customer', {
                    templateUrl: 'src/customers/new-customer.html'
                })
                .when('/memberships', {
                    templateUrl: 'src/memberships/memberships.html',
                    controller: 'MembershipsController',
                    controllerAs: 'vm'
                })
                .when('/', {
                    templateUrl: 'src/home/home.html',
                    controller: 'HomeController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);

})();