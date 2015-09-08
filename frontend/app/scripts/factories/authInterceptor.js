(function () {
    'use strict';

    angular.module('foodCircle').factory('authInterceptor', ['authToken', 'AUTH_EVENTS', '$rootScope', '$q', function (authToken, AUTH_EVENTS, $rootScope, $q) {



        return {
            request: function (config) {
                var token = authToken.getToken();

                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },
            response: function (response) {
                return response;
            },

            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);

                return $q.reject(response);
            }
        };
    }]);
}());
