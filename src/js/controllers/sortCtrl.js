(function() {
    'use strict';

    angular
        .module('users')
        .controller('sortController', sortController);

    sortController.inject = [''];

    function sortController() {
        var vm = this;
        vm.orderBy = 'name';
        vm.reverse = false;



        vm.filterOrderBy = function(column) {
            if (vm.orderBy === column) {
                vm.reverse = !vm.reverse;
            } else {
                vm.orderBy = column;
            }
        }

        vm.sortIconClass = function(col) {
            if (vm.orderBy === col && !vm.reverse) {
                return 'down active'
            } else if (vm.orderBy === col && vm.reverse) {
                return 'up active'
            } else {
                return 'down'
            }
        }
    }
})();