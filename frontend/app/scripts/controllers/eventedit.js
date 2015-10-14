/**
 * @ngdoc function
 * @name foodCircle.controller:EventeditCtrl
 * @description
 * # EventeditCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('EventEditCtrl', ['EventService', 'EventModel', 'alert', 'event', '$moment', function (EventService, EventModel, alert, event, $moment) {
        var vm = this

        vm.event = EventModel.create(event);
        vm.datepicker = {};

        vm.submit = function (isValidForm, eventform, event) {
            event.preventDefault();

            if (!isValidForm) {
                return;
            }

            EventService.createOrUpdate(EventModel.create(vm.event)).then(function (event) {
                alert('info', event.title, 'saved');
            })
                .catch(function (error) {
                debugger;
                    alert('warning', 'Error','Saving event');
                });
        };

        vm.datepicker.today = function () {
            vm.event.date = (event && event.date) || new Date();
        };
        vm.datepicker.today();

        vm.datepicker.clear = function () {
            vm.event.date = null;
        };

        // Disable weekend selection
        vm.datepicker.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        vm.datepicker.toggleMin = function () {
            vm.datepicker.minDate = $moment().startOf('year');
        };
        vm.datepicker.toggleMin();
        vm.datepicker.maxDate = new Date(2025, 5, 30);

        vm.datepicker.open = function ($event) {
            vm.datepicker.status.opened = true;
        };

        vm.datepicker.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.datepicker.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.datepicker.format = vm.datepicker.formats[0];

        vm.datepicker.status = {
            opened: false
        };
    }]);
}());
