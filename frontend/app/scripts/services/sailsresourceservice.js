/**
 * @ngdoc service
 * @name foodCircle.SailsResourceService
 * @description
 * # SailsResourceService
 * Service in the foodCircle.
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('SailsResourceService', ['sailsResource', 'authService', function (sailsResource, authService) {

        var DEFAULT_ACTIONS = {
                'get': {
                    method: 'GET'
                },
                'save': {
                    method: 'POST',
                    transformRequest: function (request) {
                        request.token = authService.getToken();
                        return request;
                    }
                },
                'query': {
                    method: 'GET',
                    isArray: true
                },
                'remove': {
                    method: 'DELETE'
                },
                'delete': {
                    method: 'DELETE'
                }
            },

            SailsResourceService = {};

        SailsResourceService.getResource = function (name, actions) {
            var a = angular.extend({}, actions, DEFAULT_ACTIONS);
            return sailsResource(name, a);
        };

        return SailsResourceService;
    }]);
}());
