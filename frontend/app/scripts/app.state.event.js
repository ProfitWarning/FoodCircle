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
                    blog: ['EventService', '$stateParams', 'queryService', function (EventService, $stateParams, queryService) {
                        var defaultQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};
                        return EventService.getEventList(queryService.queryFromUrlParam(defaultQuery, $stateParams.query));
                    }]
                },
                views: {
                    'eventlist': {
                        controller: 'ListEventCtrl as vm',
                        templateUrl: 'views/event.list.html'
                    }
                }
            });
    }]);
}());
