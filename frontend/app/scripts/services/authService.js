(function () {
    'use strict';

    angular.module('foodCircle').service('authService', ['$auth', '$window', '$q', function ($auth, $window, $q) {
        var authService = {},
            currentUser;


        authService.currentUser = function () {
            return currentUser;
        };

        authService.login = function (email, password) {
            var deferred = $q.defer();

            $auth.login({
                email: email,
                password: password
            })
                .then(function (response) {
                    currentUser = response.data.user;
                    deferred.resolve(response.data.user);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        return authService;
    }]);
}());
