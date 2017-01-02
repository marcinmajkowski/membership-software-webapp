(function () {
    'use strict';

    angular
        .module('membershipSoftware', [
            'ngMaterial',
            'ngResource',
            'membershipSoftwareRoute',
            'membershipSoftwareConstants',
            'membershipSoftwareLayout',
            'paging',
            'home',
            'checkIns',
            'payments',
            'customers',
            'memberships'
        ]);

})();