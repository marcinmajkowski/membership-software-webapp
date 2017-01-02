(function () {
    'use strict';

    angular
        .module('paging')
        .component('msPageControl', {
            templateUrl: "src/paging/page-control.html",
            controller: 'PageControlController',
            bindings: {
                page: '<msPage',
                onChange: '&?msOnChange'
            }
        });

})();