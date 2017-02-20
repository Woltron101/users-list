;
(function() {
    'use strict';

    angular
        .module('users')
        .directive('repeatEnd', repeatEnd);

    repeatEnd.inject = ['$timout', '$sessionStorage'];

    function repeatEnd($timeout, $sessionStorage) {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            if (scope.$last && !$sessionStorage.usersReady) {
                $timeout(function() {
                    alert('Users are shown');
                    $sessionStorage.usersReady = true;
                });
            }
        }
    }
})();