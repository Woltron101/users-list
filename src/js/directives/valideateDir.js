(function() {
    'use strict';

    angular
        .module('users')
        .directive('validate', validate);

    validate.inject = ['$rootScope', '$state'];

    function validate($rootScope, $state) {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
            scope: {
                validate: '@'
            }
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$validators.validate = function(modelValue) {
                var isValid = true;
                if ($state.current.name === 'users.edit') return true;
                $rootScope.users.forEach(function(user, index) {
                    // console.log("$rootScope.user ", $rootScope.user.id);
                    var comparedStr = attrs['validate'] === 'company.name' ? user.company.name : user[attrs['validate']];
                    if (comparedStr === modelValue) {
                        console.log("user.id ", user.id);
                        isValid = false;
                        return;
                    }
                });

                return isValid;
            }
        }
    }
})();