(function () {
    'use strict';

    angular
        .module('membershipSoftwareLayout')
        .controller('MainController', MainController);

    MainController.$inject = ['customersService', '$mdSidenav', '$location', '$mdDialog', '$scope'];

    //TODO handle events to maintain sidebar list (or better get rid of it)
    function MainController(customersService, $mdSidenav, $location, $mdDialog, $scope) {
        var vm = this;

        vm.autocomplete = {};
        vm.customersQuerySearch = customersQuerySearch;
        vm.selectedCustomerChange = selectedCustomerChange
        vm.toggleList = toggleCustomersList;
        vm.selectCustomer = selectCustomer;
        vm.go = go;
        vm.newCustomer = newCustomer;
        vm.customers = [];
        vm.customersLoading = false;
        vm.findCustomer = findCustomer;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            loadCustomers();

            //TODO pass reference to customer/card together with event and update lists locally
            $scope.$on('customerCreated', loadCustomers);
            $scope.$on('customerUpdated', loadCustomers);
            $scope.$on('customerDeleted', loadCustomers);
            $scope.$on('cardCreated', loadCustomers);
            $scope.$on('cardUpdated', loadCustomers);
            $scope.$on('cardDeleted', loadCustomers);
        }

        function loadCustomers() {
            vm.customersLoading = true;
            customersService
                .getCustomersProjection('firstNameAndLastNameAndCards')
                .then(function (customers) {
                    vm.customersLoading = false;
                    vm.customers = [].concat(customers);
                }, function () {
                    vm.customersLoading = false;
                    //TODO report error
                });
        }

        function customersQuerySearch(query) {
            return vm.customers.filter(createFilterFor(query));
        }

        /**
         * Create filter function for a query string. If query is a sequence
         * of 12 digits, then search is performed over customers card codes.
         * This is to handle barcode scanner input. Otherwise search is
         * performed over customers first and last names.
         */
        function createFilterFor(query) {
            var queryIsCardCode = /^\d+$/.test(query) && query.length === 12;

            if (queryIsCardCode) {
                return function cardCodeMatches(customer) {
                    for (var i = 0; i < customer.cards.length; i++) {
                        if (customer.cards[i].code === query) {
                            return true;
                        }
                    }

                    return false;
                }
            } else {
                var lowercaseQuery = angular.lowercase(query);

                //TODO polish special characters
                return function fullNameMatches(customer) {
                    var lowercaseFirstName = angular.lowercase(customer.firstName);
                    var lowercaseLastName = angular.lowercase(customer.lastName);
                    var lowercaseFullName = lowercaseFirstName + ' ' + lowercaseLastName;
                    if (lowercaseFullName.indexOf(lowercaseQuery) === 0) {
                        return true;
                    }

                    if (lowercaseLastName.indexOf(lowercaseQuery) === 0) {
                        return true;
                    }

                    return false;
                };
            }
        }

        function selectedCustomerChange(customer) {
            if (!customer) {
                return;
            }

            vm.go('/customer/' + customer.id);
            vm.autocomplete = {};
        }

        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleCustomersList() {
            $mdSidenav('left').toggle();
        }

        function closeCustomerList() {
            $mdSidenav('left').close();
        }

        /**
         * Use ng-click="go('/home')" instead of ng-href="#/home".
         * This is workaround for wrongly displayed md-button with href attribute.
         */
        function go(path) {
            $location.path(path);
        }

        function newCustomer(ev) {
            $mdDialog.show({
                targetEvent: ev,
                controller: 'NewCustomerDialogController',
                templateUrl: 'src/customers/new-customer-dialog.html',
                controllerAs: 'vm'
            }).then(function (userInput) {
                var newCustomer = {
                    firstName: userInput.firstName,
                    lastName: userInput.lastName
                };

                customersService.createCustomer(newCustomer).then(function (customer) {
                    var code = userInput.code;
                    if (code && 0 !== code.length) {
                        var pad = "000000000000";
                        var paddedCode = pad.substring(0, pad.length - code.length) + code;
                        customersService.createCardForCustomerByCode(customer, paddedCode).then(function () {
                            selectCustomer(customer);
                        });
                    } else {
                        selectCustomer(customer);
                    }
                });

                //TODO report error

            });
        }

        function selectCustomer(customer) {
            closeCustomerList();
            $location.path('/customer/' + customer.id);
        }

        function findCustomer() {
            console.log('TODO MainController.searchCustomer()');
        }
    }

})();