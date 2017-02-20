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
                    url: '/add',
                    templateUrl: 'templates/modal.html'
                })
                .state('users.edit', {
                    url: '/edit',
                    templateUrl: 'templates/modal.html'
                })

            $urlRouterProvider.otherwise('/users');
        }
    ])



.run(function($rootScope, $http, $localStorage) {
    $localStorage.pos = {};
    $rootScope.users = [];

    getLocation();
    getUsers();

    function getUsers() {
        $http({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users'
        }).then(function(response) {
            $rootScope.users = response.data;
        });
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $localStorage.pos.lat = position.coords.latitude;
                $localStorage.pos.lng = position.coords.longitude;
                getUsers();
            })
        } else {
            alert("Geolocation is not supported");
        }
    }

});