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

    //window.io.sails.url = 'http://localhost:1337';
    window.io.sails.autoConnect = false;

    angular.module('foodCircle', ['ngCookies', 'ngResource', 'ngSanitize', 'routing.event', 'routing.main', 'routing.myrecipes', 'routing.user', 'routing.recipe', 'routing.blog', 'routing.profile', 'routing.calendar', 'sailsResource', 'satellizer', 'LocalStorageModule', 'ngFileUpload', 'ui.bootstrap', 'ngAnimate', 'angular-confirm', 'mwl.calendar', 'angular-momentjs', 'ngMessages', 'config.translate']);

}());
