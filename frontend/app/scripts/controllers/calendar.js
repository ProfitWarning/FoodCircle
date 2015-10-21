/**
 * @ngdoc function
 * @name foodCircle.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('CalendarCtrl', ['EventService', '$moment', '$state', 'authService', function (EventService, $moment, $state, authService) {

        var vm = this, initEvents, defaultEvent;
        vm.events = [];
        vm.calendarView = 'month';
        vm.calendarDay = new Date();

        vm.eventClicked = function (event) {
            if (event && event.id) {
                $state.go('main.event.edit', {id: event.id});
            }
        };
        vm.eventEdited = function (calendarEvent) {
            if (calendarEvent && calendarEvent.id) {
                $state.go('main.event.edit', {id: calendarEvent.id});
            }
        };

        defaultEvent = {
            title: null, // The title of the event
            type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
            startsAt: null, // A javascript date object for when the event starts
            endsAt: null, // Optional - a javascript date object for when the event ends
            editable: true, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
            deletable: true, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
            draggable: true, //Allow an event to be dragged and dropped
            resizable: true, //Allow an event to be resizable
            incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
            recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
            cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
        };
        initEvents = function () {
            EventService.getEventList().then(function (events) {
                events.forEach(function (event) {
                    event.startsAt = event.startsAt || $moment(event.startDate).toDate();
                    event.endsAt = event.endsAt || $moment(event.endDate).toDate();
                    event.isOwned = authService.currentUser().id === event.eventowner.id;
                    event.editable = event.isOwned;
                    event.deletable = event.isOwned;
                    event.titleHtml = ['<span style="padding-right:15px;">',
                                  event.title,
                                   '</span>'].join("\n");

                    var eventDisplay = angular.extend({}, defaultEvent, event);

                    vm.events.push(eventDisplay);
                });
            });
        };

        initEvents();
    }]);
}());
