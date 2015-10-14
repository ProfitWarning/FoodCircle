/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.event', ['ui.router']).config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('main.event', {
                url: '/event',
                templateUrl: 'views/event.html',
                abstract: true
            })
            .state('main.event.list', {
                url: '/list/:query',
                resolve: {
                    events: ['EventService', '$stateParams', 'queryService', function (EventService, $stateParams, queryService) {
                        var defaultQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};
                        return EventService.getEventList(queryService.queryFromUrlParam(defaultQuery, $stateParams.query));
                    }]
                },
                views: {
                    'eventlist': {
                        controller: 'EventListCtrl as vm',
                        templateUrl: 'views/event.list.html'
                    }
                }
            })
            .state('main.event.edit', {
                url: '/edit/:id',
                resolve: {
                    event: ['EventService', '$stateParams', function (EventService, $stateParams) {
                        return EventService.getEventById($stateParams.id);
                    }]
                },
                views: {
                    'eventlist': {
                        controller: 'EventEditCtrl as vm',
                        templateUrl: 'views/event.edit.html'
                    }
                }
            })
            .state('main.event.create', {
                url: '/create/',
                resolve: {
                    event: function () {}
                },
                views: {
                    'eventlist': {
                        controller: 'EventEditCtrl as vm',
                        templateUrl: 'views/event.edit.html'
                    }
                }
            });
    }]);
}());
