(function() {
    'use strict';

    angular
        .module('users')
        .factory('users', users);

    users.inject = ['$http'];

    function users($http) {
        var service = {};

        // service.filterOrederBy = function(column, orderBy, reverse) {
        //     if (this.orderBy === column) {
        //         this.reverse = !this.reverse;
        //     } else {
        //         this.orderBy = column;
        //     }
        // }
        // service.remove = function(index) {
        //     this.users.splice(index, 1)
        // }
        return service;
    }
})();