;
(function() {
    'use strict';

    angular
        .module('users')
        .directive('repeatEnd', repeatEnd);

    repeatEnd.inject = ['$timout'];

    function repeatEnd($timeout) {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            if (scope.$last) {
                $timeout(function() {
                    // alert('users viewd');
                });
            }
        }
    }
})();