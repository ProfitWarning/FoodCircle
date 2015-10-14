/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.calendar', ['ui.router']).config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('main.calendar', {
                url: '/Calendar/',
                controller: 'CalendarCtrl as vm',
                templateUrl: 'views/calendar.html'
            });
    }]);
}());

