/**
 * @ngdoc overview
 * @name foodCircle
 * @description
 * # foodCircle
 *
 * Main module of the application.
 */

(function () {

    'use strict';

    angular.module('foodCircle', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'sailsResource', 'satellizer', 'LocalStorageModule']);
    window.io.sails.url = 'http://localhost:1337';

}());
