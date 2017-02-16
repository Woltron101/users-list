var users = angular.module('users', [
        'ui.router',
        'ngStorage',
        'ngclipboard'
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('users', {
                    url: '/users',
                    templateUrl: 'templates/users.html',
                    controller: 'usersController as users'
                })
                .state('users.add', {
                    url: 'users/add',
                    templateUrl: 'templates/modal.html'
                })
                .state('users.edit', {
                    url: 'users/edit',
                    templateUrl: 'templates/modal.html'
                })

            $urlRouterProvider.otherwise('/users');
        }
    ])



.run(function($rootScope, $http) {
    $rootScope.pos = {};
    $rootScope.users = [];

    $http({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users'
    }).then(function(response) {
        $rootScope.users = response.data;
    });

    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

                $rootScope.pos.lat = position.coords.latitude;
                $rootScope.pos.lng = position.coords.longitude;
            }, function(error) {
                console.log("error ", error);

            });
        } else {
            alert("Geolocation is not supported");
        }
    }
});