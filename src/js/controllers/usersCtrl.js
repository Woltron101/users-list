;
(function() {
    'use strict';

    angular
        .module('users')
        .controller('usersController', usersController);

    usersController.inject = ['$http', '$scope', '$rootScope'];

    function usersController($http, $scope, $rootScope) {
        var vm = this;

        $http({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users'
        }).then(function successCallback(response) {
            vm.users = response.data;
            invalid();
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        vm.currentUser = {
            name: "",
            username: ""
        }
        vm.orderBy = 'name';
        vm.reverse = false;
        vm.filterOrderBy = function(column) {
            if (vm.orderBy === column) {
                vm.reverse = !vm.reverse;
            } else {
                vm.orderBy = column;
            }
        }

        vm.remove = function(index) {
            vm.users.splice(index, 1)
        }
        vm.edit = function(user) {
            vm.user = user;
            showModal();

        }
        vm.modal = {}

        function showModal() {
            vm.modal.active = true;
        }

        vm.hideModal = function(e) {
            var target = angular.element(e.target);
            if (target.hasClass('modal-wrap') || target.hasClass('close') || e.keyCode === 27) {
                vm.modal.active = false;
            }
        }

        vm.invalid = {
            usernames: "",
            emails: "",
            companies: ""
        }
        vm.pos = {};
        vm.getLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {

                    vm.pos.lat = position.coords.latitude;
                    vm.pos.lon = position.coords.longitude;
                });
            } else {
                alert("Geolocation is not supported");
            }
        }

        function invalid() {
            vm.users.forEach(function(user) {
                    vm.invalid.usernames += user.username + ',';
                    vm.invalid.emails += user.email + ',';
                    vm.invalid.companies += user.company.name + ',';
                })
                // console.log("vm.invalid ", vm.invalid);
        }

        // function distance(lat1, lon1, lat2, lon2, unit) {
        //     var radlat1 = Math.PI * lat1 / 180
        //     var radlat2 = Math.PI * lat2 / 180
        //     var theta = lon1 - lon2
        //     var radtheta = Math.PI * theta / 180
        //     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        //     dist = Math.acos(dist)
        //     dist = dist * 180 / Math.PI
        //     dist = dist * 60 * 1.1515
        //     if (unit == "K") { dist = dist * 1.609344 }
        //     if (unit == "N") { dist = dist * 0.8684 }
        //     return dist
        // }
        vm.distance = function(lat1, lon1) {
            var radlat1 = Math.PI * lat1 / 180
            var radlat2 = Math.PI * $rootScope.pos.lat / 180
            var theta = lon1 - $rootScope.pos.lng
            var radtheta = Math.PI * theta / 180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180 / Math.PI
            dist = dist * 60 * 1.1515
            dist = dist * 1.609344
            dist = dist.toFixed(0)
            return dist
        }
    }
})();