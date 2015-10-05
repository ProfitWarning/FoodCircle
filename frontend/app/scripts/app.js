/**
 * @ngdoc overview
 * @name foodCircle
 * @description
 * # foodCircle
 *
 * Main module of the application.
 */
/*global
    angular
*/


(function () {

    'use strict';

    angular.module('foodCircle', ['ngCookies', 'ngResource', 'ngSanitize', 'routing', 'routing.main', 'routing.myrecipes', 'routing.user', 'routing.recipe', 'sailsResource', 'satellizer', 'LocalStorageModule', 'ngFileUpload', 'ui.bootstrap', 'ngAnimate', 'angular-confirm']);
    //window.io.sails.url = 'http://localhost:1337';
    window.io.sails.autoConnect = false;

}());
