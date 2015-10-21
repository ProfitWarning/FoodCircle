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

    angular.module('foodCircle').service('SailsResourceService', ['sailsResource', 'authService', '$window', 'API_URL', function (sailsResource, authService, $window, API_URL) {

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
                    /*url: '/recipe/:id/images/:imageid'*/
                },
                'delete': {
                    method: 'DELETE'
                }
            },
            resourceConfig = {
                verbose: true, // sailsResource will log messages to console
                //prefix: 'myapi', // apply a prefix to all routes
                socket: null, // provide your own socket instance,
                origin: API_URL // change the socket origin
            },

            SailsResourceService = {};

        SailsResourceService.getResource = function (name, actions, rsConfig) {
            if (!rsConfig) {
                rsConfig = resourceConfig;
            }
            if (!rsConfig.socket) {
                rsConfig.socket = $window.io.sails.connect(rsConfig.origin);
            }
            var a = angular.extend({}, actions, DEFAULT_ACTIONS);

            return sailsResource(name, a, rsConfig);
        };

        return SailsResourceService;
    }]);
}());
