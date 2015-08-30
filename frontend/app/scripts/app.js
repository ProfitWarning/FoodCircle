'use strict';

/**
 * @ngdoc overview
 * @name foodCircle
 * @description
 * # foodCircle
 *
 * Main module of the application.
 */

angular.module('foodCircle', ['ngCookies', 'ngResource', 'ngSanitize','ui.router', 'sailsResource', 'satellizer']);
window.io.sails.url = 'http://localhost:1337';
