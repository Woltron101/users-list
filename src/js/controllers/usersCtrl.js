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
        vm.editSave = function() {
            var index = vm.user.id;
            vm.users[index - 1] = vm.user;
            console.log("vm.users ", vm.users);
            vm.modal.active = false;
        }
        vm.modal = {}
        vm.addNewUser = function() {
            vm.user = {
                id: vm.users.length,
                name: "",
                username: "",
                email: "",
                address: {
                    street: "",
                    suite: "",
                    city: "",
                    zipcode: "",
                    geo: {
                        lat: "",
                        lng: ""
                    }
                },
                phone: "",
                website: "",
                company: {
                    name: "",
                    catchPhrase: "",
                    bs: ""
                }
            }

            // if (key === 'id') vm.user[key] = users.length + 1;
            // else value = "";
            showModal();

        }


        vm.hideModal = function(e) {
            if (!e) return;
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


        function invalid() {
            vm.users.forEach(function(user) {
                    vm.invalid.usernames += user.username + ',';
                    vm.invalid.emails += user.email + ',';
                    vm.invalid.companies += user.company.name + ',';
                })
                // console.log("vm.invalid ", vm.invalid);
        }


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

        function showModal() {
            vm.modal.active = true;
        }
    }
})();