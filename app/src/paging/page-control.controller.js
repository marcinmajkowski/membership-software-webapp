(function () {
    'use strict';

    angular
        .module('paging')
        .controller('PageControlController', PageControlController);

    PageControlController.$inject = [];

    function PageControlController() {
        var ctrl = this;

        ctrl.sizeChanged = sizeChanged;
        ctrl.previousPage = previousPage;
        ctrl.nextPage = nextPage;
        //FIXME I don't use page.size because I don't want to modify object passed with one-way binding
        //FIXME now page.size is ignored
        ctrl.pageSize = 10;
        ctrl.from = from;
        ctrl.to = to;

        // *********************************
        // Internal methods
        // *********************************

        function sizeChanged() {
            //FIXME adjust which page should be showed after change
            ctrl.onChange && ctrl.onChange({
                changedPage: {
                    size: ctrl.pageSize,
                    number: ctrl.page.number,
                    totalElements: ctrl.page.totalElements
                }
            });
        }

        function previousPage() {
            ctrl.onChange && ctrl.onChange({
                changedPage: {
                    size: ctrl.page.size,
                    number: ctrl.page.number - 1,
                    totalElements: ctrl.page.totalElements
                }
            });
        }

        function nextPage() {
            //TODO disable next page button if this is last page
            ctrl.onChange && ctrl.onChange({
                changedPage: {
                    size: ctrl.page.size,
                    number: ctrl.page.number + 1,
                    totalElements: ctrl.page.totalElements
                }
            });
        }

        function from() {
            var size = ctrl.page.size;
            var number = ctrl.page.number;
            return number * size + 1;
        }

        function to() {
            var totalElements = ctrl.page.totalElements;
            var size = ctrl.page.size;
            var number = ctrl.page.number;
            var computedTo = number * size + size;
            return computedTo < totalElements ? computedTo : totalElements;
        }

    }

})();