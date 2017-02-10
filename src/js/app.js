var users = angular.module('users', [
        'ui.router',
        'ngStorage'
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('users', {
                    url: '/users',
                    templateUrl: 'templates/users.html',
                    controller: 'usersController as users'
                })

            $urlRouterProvider.otherwise('/users');
        }
    ])
    // .directive('elemReady', function($parse) {
    //     return {
    //         restrict: 'A',
    //         link: function($scope, elem, attrs) {

//             elem.ready(function() {
//                 $scope.$apply(function() {
//                     var func = $parse(attrs.elemReady);
//                     func($scope);
//                 })
//             })

//         }
//     }
// })
.directive("repeatEnd", function($timeout) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                if (scope.$last) {
                    $timeout(function() {
                        // alert('last');
                    });
                }
            }
        };
    })
    .directive('listUser', function() {
        return {
            require: 'ngModel',
            scope: {
                users: '='
            },
            link: function(scope, elem, attr, ngModel) {
                // var list = attr[list].split(',');
                // console.log("list ", attr[users]);


                // //For DOM -> model validation
                // ngModel.$parsers.unshift(function(value) {
                //     var valid = list.indexOf(value) === -1;
                //     console.log("users ", attrs['users']);
                //     console.log("list ", list);
                //     ngModel.$setValidity('list', valid);
                //     return valid ? value : undefined;
                // });

                // //For model -> DOM validation
                // ngModel.$formatters.unshift(function(value) {
                //     ngModel.$setValidity('list', list.indexOf(value) === -1);
                //     return value;
                // });
            }
        };
    })

// .directive('ensureExpression', ['$http', '$parse', function($http, $parse) {
//     return {
//         require: 'ngModel',
//         link: function(scope, ele, attrs, ngModelController) {
//             scope.$watch(attrs.ngModel, function(value) {
//                 var booleanResult = $parse(attrs.ensureExpression)(scope);
//                 console.log("attrs.ensureExpression ", attrs.ensureExpression);
//                 console.log("booleanResult ", booleanResult);
//                 ngModelController.$setValidity('expression', booleanResult);
//             });
//         }
//     };
// }]);
.run(function($rootScope) {
    $rootScope.pos = {};

    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

                $rootScope.pos.lat = position.coords.latitude;
                $rootScope.pos.lng = position.coords.longitude;
            });
        } else {
            alert("Geolocation is not supported");
        }
    }
});