
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').config(['$urlRouterProvider', 'sailsResourceProvider', '$httpProvider', '$authProvider', 'API_URL', 'localStorageServiceProvider',
        function ($urlRouterProvider, sailsResourceProvider, $httpProvider, $authProvider, API_URL, localStorageServiceProvider) {

            $urlRouterProvider.when('', '/');

            sailsResourceProvider.configuration = {
                verbose: true, // sailsResource will log messages to console
                //prefix: 'myapi', // apply a prefix to all routes
                //socket: io.connect('http://localhost:1337'), // provide your own socket instance,
                origin: 'http://localhost:1337' // change the socket origin
            };

            $authProvider.loginUrl = API_URL + 'auth/';
            $authProvider.signupUrl = API_URL + 'auth/register';

            $httpProvider.interceptors.push('authInterceptor');

            localStorageServiceProvider.setPrefix('ls');

        }])
        .constant('API_URL', 'http://localhost:1337/')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .run(['$rootScope', '$state', '$auth', 'AUTH_EVENTS', 'authorization', 'alert', function ($rootScope, $state, $auth, AUTH_EVENTS, authorization, alert) {
                                                        /*event, toState, toParams, fromState, fromParams*/
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                /*if (toState.name === 'home' ||
                        toState.name === 'login' ||
                        toState.name === 'impressum' ||
                        toState.name === 'home' ||
                        toState.name === 'myrecipes.detail' ||
                        toState.name === 'user.detail'
                        ) {
                    return; // no need to redirect
                }

                // now, redirect only not authenticated
                if (!$auth.isAuthenticated()) {
                    event.preventDefault(); // stop current execution
                    $state.go('login'); // go to login
                }*/
            });

            /*$rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });*/

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error.message === AUTH_EVENTS.notAuthorized) {
                    event.preventDefault(); // stop current execution
                    $auth.logout();
                    $state.go('main.login'); // go to login
                    alert('warning', 'Not authorized!');
                }
            });

            $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
                event.preventDefault();
                $auth.logout();
                $state.go('main.login'); // go to login
                alert('warning', 'Not authorized!');
            });

            $rootScope.$on('$sailsSocketError', function () {

            });
        }]);
}());
