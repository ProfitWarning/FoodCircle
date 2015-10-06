/**
 * @ngdoc function
 * @name foodCircle.controller:ListeventCtrl
 * @description
 * # ListeventCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('EventListCtrl', ['events', function (events) {
        var vm = this;
        vm.events = events;
    }]);
}());
