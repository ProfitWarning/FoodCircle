/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.profile', ['ui.router']).config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('main.profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                resolve: {
                    authorize: ['authorization', function (authorization) {
                        return authorization.authorize();
                    }]
                },
                abstract: true
            })
            .state('main.profile.index', {
                url: '/:id',
                views: {

                    'events': {
                        controller: 'ProfileCtrl as vm',
                        template: '<profile-event-list event-item-click="vm.onEventItemClick(event)" event-list-query="vm.eventListQuery"></profile-event-list>'
                    },
                    'recipes': {
                        controller: 'ProfileCtrl as vm',
                        template: '<profile-recipe-list recipe-item-click="vm.onRecipeItemClick(recipe)" event-list-query="vm.eventListQuery"></profile-recipe-list>'
                    }
                }
            });
    }]);
}());

