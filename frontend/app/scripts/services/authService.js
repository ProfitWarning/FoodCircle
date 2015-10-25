
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('authService', ['$auth', '$window', '$q', 'localStorageService', function ($auth, $window, $q, localStorageService) {
        var authService = {};

        authService.currentUser = function () {
            return localStorageService.get('currentUser');
        };

        authService.login = function (email, password) {
            var deferred = $q.defer();

            $auth.login({
                email: email,
                password: password
            })
                .then(function (response) {
                    localStorageService.set('currentUser', response.data.user);
                    localStorageService.set('satellizer_token', response.data.token);
                    deferred.resolve(response.data.user);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        authService.getToken = function () {
          return $auth.getToken();
        };

        return authService;
    }]);
}());
