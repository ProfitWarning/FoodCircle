'use strict';

angular.module('foodCircle').factory('authInterceptor', ['authToken', 'alert', function (authToken, alert) {
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
        }
    };
}]);
