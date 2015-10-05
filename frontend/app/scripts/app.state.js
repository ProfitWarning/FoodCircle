/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing', ['ui.router']).config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('main.blog', {
                url: '/blog',
                templateUrl: 'views/blog.html',
                abstract: true
            })
            .state('main.blog.detail', {
                url: '/:name',
                resolve: {
                    blog: ['BlogService', '$stateParams', function (BlogService, $stateParams) {
                        return BlogService.getBlogByName($stateParams.name);
                    }]
                },
                views: {
                    'blog': {
                        controller: 'BlogCtrl as vm',
                        templateUrl: 'views/blog.detail.html'
                    }
                }
            })
            .state('main.blog.list', {
                url: '/list/:query',
                resolve: {
                    blogList: ['BlogService', '$stateParams', 'queryService', function (BlogService, $stateParams, queryService) {
                        var defaultQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};
                        return BlogService.getBlogList(queryService.queryFromUrlParam(defaultQuery, $stateParams.query));
                    }]
                },
                views: {
                    'bloglist': {
                        controller: 'ListBlogCtrl as vm',
                        templateUrl: 'views/blog.list.html'
                    }
                }
            })
            .state('main.event', {
                url: '/event',
                templateUrl: 'views/event.html',
                abstract: true
            })
            .state('main.event.list', {
                url: 'list/:query',
                resolve: {
                    blog: ['EventService', '$stateParams', 'queryService', function (EventService, $stateParams, queryService) {
                        var defaultQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};
                        return EventService.getEventList(queryService.queryFromUrlParam(defaultQuery, $stateParams.query));
                    }]
                },
                views: {
                    'event': {
                        controller: 'ListEventCtrl as vm',
                        templateUrl: 'views/event.list.html'
                    }
                }
            });
    }]);
}());
