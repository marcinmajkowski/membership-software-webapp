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
        vm.go = go;
        vm.newCustomer = newCustomer;
        vm.customers = [];
        vm.isCustomerSelected = isCustomerSelected;
        vm.findCustomer = findCustomer;

        activate();

        // *********************************
        // Internal methods
        // *********************************

        function activate() {
            loadCustomers();

            $scope.$on('customerUpdated', loadCustomers);
            $scope.$on('customerDeleted', loadCustomers);
            $scope.$on('customerCreated', loadCustomers);
            //TODO handle card events
        }

        function loadCustomers() {
            customersService.getCustomersProjection('firstNameAndLastNameAndCards').then(function (customers) {
                vm.customers = [].concat(customers);
            });
        }

        function customersQuerySearch(query) {
            return vm.customers.filter(createFilterFor(query));
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            //TODO card numbers
            //TODO polish special characters
            return function filterFn(customer) {
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
                        customersService.createCardForCustomerByCode(customer, code).then(function () {
                            selectCustomer(customer);
                        });
                    } else {
                        selectCustomer(customer);
                    }
                });

                function selectCustomer(customer) {
                    $location.path('/customer/' + customer.id);
                }

                //TODO report error

            });
        }

        function isCustomerSelected(customer) {
            return $location.path() == '/customer/' + customer.id;
        }

        function findCustomer() {
            console.log('TODO MainController.searchCustomer()');
        }
    }

})();