/**
 * @ngdoc service
 * @name foodCircle.authorization
 * @description
 * # authorization
 * Factory in the foodCircle.
 */
/*global
    angular
*/

(function () {
    'use strict';
    angular.module('foodCircle').service('authorization', ['$state', '$auth', '$q', 'AUTH_EVENTS', function ($state, $auth, $q, AUTH_EVENTS) {

        var redirectLogin = false;

        return {
            authorize: function () {
                var deferred = $q.defer();
                if (!$auth.isAuthenticated()) {
                    redirectLogin = true;
                    deferred.reject({
                        message: AUTH_EVENTS.notAuthorized
                    });
                } else {
                    deferred.resolve();
                }

                return deferred.promise;
            },
            redirectLogin: function () {
                return redirectLogin;
            }
        };
    }]);
}());
