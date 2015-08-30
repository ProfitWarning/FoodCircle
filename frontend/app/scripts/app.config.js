'use strict';

angular.module('foodCircle').config(function($stateProvider, $urlRouterProvider, sailsResourceProvider, $httpProvider, $authProvider, API_URL) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/views/main.html'
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
          url: '/about',
          templateUrl: '/views/about.html'
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('login', {
          url: '/login',
          templateUrl: '/views/login.html'
        });

        sailsResourceProvider.configuration = {
          verbose: true, // sailsResource will log messages to console
          //prefix: 'myapi', // apply a prefix to all routes
          //socket: io.connect('http://localhost:1337'), // provide your own socket instance,
          origin: 'http://localhost:1337' // change the socket origin
        };

        $authProvider.loginUrl = API_URL + 'auth/login';
	      $authProvider.signupUrl = API_URL + 'auth/register';
})
.constant('API_URL', 'http://localhost:1337/');
