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

    angular.module('foodCircle').controller('EventListCtrl', ['eventquery', 'EventService', function (eventquery, EventService) {
        var vm = this,
            initEvents = function () {
                EventService.getEventList(eventquery).then(function (list) {
                    vm.events = list;
                });
            };

        initEvents();
    }]);
}());
