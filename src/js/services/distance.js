(function() {
    'use strict';

    angular
        .module('users')
        .factory('distance', distance);

    distance.inject = ['$rootScope'];

    function distance($rootScope) {
        var service = {
            calculate: calculate
        };

        return service;

        function calculate(lat1, lon1) {

            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * $rootScope.pos.lat / 180;
            var theta = lon1 - $rootScope.pos.lng;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            dist = dist.toFixed(0);
            if (dist > 0) return dist;
            else return '';
        }
    }
})();