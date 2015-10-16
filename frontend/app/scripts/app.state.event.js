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
                        if (!$stateParams.id) {
                            return null;
                        }
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
            .state('main.event.detail', {
                url: '/:id',
                resolve: {
                    event: ['EventService', '$stateParams', function (EventService, $stateParams) {
                        if (!$stateParams.id) {
                            return null;
                        }
                        return EventService.getEventById($stateParams.id);
                    }]
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
