/**
 * @ngdoc directive
 * @name foodCircle.directive:profile.event.list
 * @description
 * # profile.event.list
 */
/*global
    angular
*/

(function () {
    'use strict';
    angular.module('foodCircle').directive('profileEventList', ['EventService', function (EventService) {

        //<profile-event-list event-item-click="vm.onEventItemClick(event)" event-list-query="vm.eventListQuery"></profile-event-list>

        var controller = function () {
                var vm = this, initEvents;
                vm.onEventItemClick = function (event) {
                    vm.eventItemClick({event: event});
                };

                initEvents = function () {
                    var query = vm.eventListQuery;
                    EventService.getEventList(query).then(function (list) {
                        vm.events = list;
                    });
                };

                initEvents();
            };

        return {
            restrict: 'EA',
            scope: {
                clickEvent: '&',
                eventQuery: '='
            },
            templateUrl: 'views/partials/directive.event.list.html',
            controller: controller,
            controllerAs: 'vm',
            bindToController: {
                eventItemClick: '&',
                eventListQuery: '='
            }/*,
            link: function postLink(scope, element, attrs) {

            }*/
        };
    }]);
}());