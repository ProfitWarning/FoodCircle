'use strict';

angular.module('foodCircle').factory('authToken', ['$window', function ($window) {
    var storage = $window.localStorage,
        cachedToken,
        userToken = 'satellizer_token',
        isAuthenticated = false,
        authToken = {
            setToken: function (token) {
                cachedToken = token;
                storage.setItem(userToken, token);
                isAuthenticated = true;
            },
            getToken: function () {
                if (!cachedToken) {
                    cachedToken = storage.getItem(userToken);
                }

                return cachedToken;
            },
            isAuthenticated: function () {
                return !!authToken.getToken();
            },
            removeToken: function () {
                cachedToken = null;
                storage.removeItem(userToken);
                isAuthenticated = false;
            }
        };

    return authToken;
}]);
