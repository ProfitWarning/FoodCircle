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

    angular.module('foodCircle').controller('EventEditCtrl', ['EventService', 'EventModel', 'alert', 'event', function (EventService, EventModel, alert, event) {
        var vm = this;
        vm.event = event || EventModel.create();
        vm.datepicker = {};

        vm.submit = function (isValidForm, event) {
            event.preventDefault();

            if (!isValidForm) {
                return;
            }

            EventService.createOrUpdate(EventModel.create(vm.event)).then(function () {
                alert('info', vm.event.title, 'saved');
            }, function (error) {
                alert('error', error.message);
            });
        };

        vm.datepicker.today = function () {
            vm.event.date = event.date || new Date();
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
            vm.datepicker.minDate = vm.datepicker.minDate ? null : new Date();
        };
        vm.datepicker.toggleMin();
        vm.datepicker.maxDate = new Date(2020, 5, 22);

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
