
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').config(['sailsResourceProvider', '$httpProvider', '$authProvider', 'API_URL', 'localStorageServiceProvider', '$provide', 'cfpLoadingBarProvider',
        function (sailsResourceProvider, $httpProvider, $authProvider, API_URL, localStorageServiceProvider, $provide, cfpLoadingBarProvider) {


            //loading spinner
            cfpLoadingBarProvider.latencyThreshold = 10;
            cfpLoadingBarProvider.includeBar = true;
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.parentSelector = 'body'


            /*sailsResourceProvider.configuration = {
                verbose: false, // sailsResource will log messages to console
                //prefix: 'myapi', // apply a prefix to all routes
                //socket: io.connect('http://localhost:1337'), // provide your own socket instance,
                origin: 'http://localhost:1337' // change the socket origin
            };*/

            $authProvider.loginUrl = API_URL + 'auth/';
            $authProvider.signupUrl = API_URL + 'auth/register';

            $httpProvider.interceptors.push('authInterceptor');

            localStorageServiceProvider.setPrefix('ls');

            $provide.decorator('$exceptionHandler', ['$delegate', '$injector', 'AUTH_EVENTS', 'FETCH_EVENTS', function ($delegate, $injector, AUTH_EVENTS, FETCH_EVENTS) {

                var $rootScope;

                return function (exception, cause) {
                    $rootScope = $rootScope || $injector.get('$rootScope');

                    //handle JWR
                    if (exception.body && exception.error && exception.headers) { //is jwr
                        if (exception.statusCode && exception.statusCode > 400) {
                            $rootScope.$broadcast({
                                401: AUTH_EVENTS.notAuthenticated,
                                403: AUTH_EVENTS.notAuthorized,
                                419: AUTH_EVENTS.sessionTimeout,
                                440: AUTH_EVENTS.sessionTimeout
                            }[exception.statusCode], exception);
                        }

                    }

                    //handle 'No items found while performing GET on a singular'
                    if (exception.indexOf && exception.indexOf('No items found while performing GET on a singular') > -1) {
                        $rootScope.$broadcast(FETCH_EVENTS.notItemOnSingleGet, exception);
                    }

                    $delegate(exception, cause);
                };
            }]);

        }])
        .constant('API_URL', 'http://localhost:1337/')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized',
            tokenExpired: 'auth-token-expired'
        })
        .constant('FETCH_EVENTS', {
            notItemOnSingleGet: 'no-item-on-single-get'
        })
        .run(['$rootScope', '$state', '$auth', 'AUTH_EVENTS', 'authorization', 'alert', '$log', 'FETCH_EVENTS', function ($rootScope, $state, $auth, AUTH_EVENTS, authorization, alert, $log, FETCH_EVENTS) {
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

            /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                $log.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
            });*/

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (fromState.name !== 'main.error') {
                    $rootScope.previousState = fromState.name;
                    $rootScope.previousStateParams = fromParams;
                    $rootScope.currentState = toState.name;
                }
            });

            /*$rootScope.$on('$viewContentLoaded', function (event) {
                $log.log('$viewContentLoaded - fired after dom rendered', event);
            });*/

            $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                $log.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
                $log.log(unfoundState, fromState, fromParams);
            });

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error && error.messagerror.messag && error.message === AUTH_EVENTS.notAuthorized) {
                    event.preventDefault(); // stop current execution
                    /*$auth.logout();
                    $state.go('main.login'); // go to login*/
                    alert('warning', 'Error', 'You are not authorized!');
                }
                /*$log.log('$stateChangeError - fired when an error occurs during transition.');*/
                $log.log(arguments);
            });

            $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
                $auth.logout();
                $state.go('main.login'); // go to login
                alert('warning', 'Error', 'Not authenticated!');
            });

            $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
                alert('warning', 'Error', 'You are not authorized!');
            });

            $rootScope.$on(FETCH_EVENTS.notItemOnSingleGet, function (event, message) {
                $state.go('main.error', {
                    error: {
                        message: message
                    }
                });
                //alert('warning', 'Error', message);
            });

            $rootScope.$on('$sailsSocketError', function (error) {
                $log.log(error);
            });
        }]);
}());
