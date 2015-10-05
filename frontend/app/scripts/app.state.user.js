/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.user', ['ui.router']).config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('main.user', {
                url: '/user',
                template: '<ui-view/>',
                abstract: true
            })
            .state('main.user.detail', {
                url: '/:id',
                controller: 'UserCtrl as vm',
                templateUrl: 'views/user.detail.html',
                resolve: {
                    user: ['userService', '$stateParams', function (userService, $stateParams) {
                        return userService.getById($stateParams.id);
                    }]
                }
            });
    }]);
}());
