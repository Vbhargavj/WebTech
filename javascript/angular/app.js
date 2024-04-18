var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'AboutController'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'ContactController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('HomeController', function($scope) {
    $scope.message = 'Welcome to the Home Page!';
});

app.controller('AboutController', function($scope) {
    $scope.message = 'Welcome to the About Page!';
});

app.controller('ContactController', function($scope) {
    $scope.message = 'Welcome to the Contact Page!';
});
