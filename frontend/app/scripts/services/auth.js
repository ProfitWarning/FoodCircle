(function () {
    'use strict';

    angular.module('foodCircle').service('auth', ['$http', 'API_URL', 'authToken', '$state', '$window', '$q', function ($http, API_URL, authToken, $state, $window, $q) {

        function authSuccessful(res) {
            authToken.setToken(res.token);
            $state.go('home');
        }
        /* jshint ignore:start */
        this.login = function (email, password) {
            return $http.post(API_URL + 'auth', {
                email: email,
                password: password
            }).success(authSuccessful);
        };
        /* jshint ignore:end */
        this.register = function (email, password) {
            return $http.post(API_URL + 'register', {
                email: email,
                password: password
            }).success(authSuccessful);
        };

        var urlBuilder = [],
            clientId = '755194447289-i6qu5n18jnh4lhph17j19cq08i0fq6f4.apps.googleusercontent.com';

        urlBuilder.push('response_type=code',
            'client_id=' + clientId,
            'redirect_uri=' + window.location.origin,
            'scope=profile email');

        this.googleAuth = function () {
            var url = "https://accounts.google.com/o/oauth2/auth?" + urlBuilder.join('&'),
                options = 'width=500,height=500,left=' + ($window.outerWidth - 500) / 2 + ',top=' + ($window.outerHeight - 500) / 2.5,
                deferred = $q.defer(),
                popup = $window.open(url, '', options);
            $window.focus();

            $window.addEventListener('message', function (event) {
                if (event.origin === $window.location.origin) {
                    var code = event.data;
                    popup.close();

                    $http.post(API_URL + 'auth/google', {
                        code: code,
                        clientId: clientId,
                        redirectUri: window.location.origin
                    }).success(function (jwt) {
                        authSuccessful(jwt);
                        deferred.resolve(jwt);
                    });
                }
            });

            return deferred.promise;
        };
    }]);
}());
