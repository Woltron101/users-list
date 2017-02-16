;
(function() {
    'use strict';

    angular
        .module('users')
        .controller('usersController', usersController);

    usersController.inject = ['$http', '$rootScope', 'distance', '$state'];

    function usersController($http, $rootScope, distance, $state) {
        var vm = this;
        var root = $rootScope;

        vm.modal = {};
        vm.distance = distance.calculate;

        vm.remove = function(index) {
            root.users.splice(index, 1)
        }

        vm.edit = function(user) {
            root.user = user;
            showModal();
            $state.go('users.edit');
            vm.modal.btnText = "Edit User"
        }

        vm.editSave = function() {
            var index = root.user.id;
            root.users[index - 1] = root.user;
            vm.modal.active = false;
            $state.go('users');
        }

        vm.addNewUser = function() {
            root.user = _.cloneDeepWith(root.users[0], function(v) {
                if (!_.isObject(v)) {
                    return v = "";
                }
            })
            root.user.id = root.users.length + 1;
            showModal();
            $state.go('users.add');
            vm.modal.btnText = "Add User"
        }

        vm.hideModal = function(e) {
            if (!e) return;
            var target = angular.element(e.target);
            if (target.hasClass('modal-wrap') || target.hasClass('close') || e.keyCode === 27) {
                vm.modal.active = false;
            }
        }

        function showModal() {
            vm.modal.active = true;
        }
    }
})();