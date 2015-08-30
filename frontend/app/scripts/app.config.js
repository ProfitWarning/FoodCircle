'use strict';

angular.module('foodCircle').config(function($stateProvider, $urlRouterProvider) {

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
});
