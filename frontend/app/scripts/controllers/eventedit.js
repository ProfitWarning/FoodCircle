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

    angular.module('foodCircle').controller('EventEditCtrl', ['EventService', 'EventModel', 'alert', 'event', '$moment', 'recipeService', '$filter', function (EventService, EventModel, alert, event, $moment, recipeService, $filter) {
        var vm = this;

        vm.event = EventModel.create(event);
        vm.recipeList = vm.event.recipes || [];
        vm.datepicker = {};
        vm.datepicker.endDate = vm.datepicker.endDate || {};
        vm.datepicker.endDate.minDate = vm.datepicker.endDate.minDate || {};

        vm.datepicker.createEventDate = function () {
            if (event && event.startDate) {
                vm.event.date = vm.event.startDate = $moment(event.startDate).toDate();
            } else if (event && event.endDate) {
                vm.event.date = vm.event.endDate = $moment(event.endDate).toDate();
            } else {
                vm.event.date = vm.event.startDate = $moment().toDate();
            }
        };
        vm.datepicker.createEventDate();

        vm.datepicker.clear = function () {
            vm.event.date = null;
        };

        // Disable weekend selection
        vm.datepicker.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };


        vm.datepicker.maxDate = new Date(2025, 5, 30);
        vm.datepicker.endDate.minDate = vm.event.date;

        vm.datepicker.open = function (mode, event) {
            event.preventDefault();

            vm.datepicker.status['opened' + mode] = true;
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


        vm.datepicker.onChanged = function (mode, date) {

            switch (mode) {

            case 'start':
                if ($moment(date.toISOString()).isAfter(vm.event.endDate.toISOString())) {
                    vm.datepicker.endDate = date;
                    vm.event.endDate = date;
                    vm.datepicker.endDate.minDate = date;
                } else {
                    vm.datepicker.endDate.minDate = date;
                }
                break;
            case 'end':
                if ($moment(date.toISOString()).isBefore(vm.event.startDate.toISOString())) {
                    vm.datepicker.endDate = vm.event.startDate;
                    vm.event.endDate = vm.event.startDate;
                    vm.datepicker.endDate.minDate = vm.event.startDate;
                }
                break;
            }

        };

        vm.timepicker = {};
        vm.timepicker.startTime = vm.event.startDate = new $moment(vm.event.startDate).startOf('hour').toDate();
        vm.timepicker.endTime = vm.event.endDate = new $moment(vm.event.endDate).add(1, 'h').startOf('hour').toDate();
        vm.timepicker.hstep = 1;
        vm.timepicker.mstep = 15;

        vm.timepicker.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        vm.timepicker.ismeridian = false;

        vm.timepicker.update = function () {

        };

        vm.timepicker.clear = function (mode) {

        };


        vm.submit = function (isValidForm, eventform, event) {
            event.preventDefault();

            if (!isValidForm) {
                return;
            }

            var tmpModel = EventModel.create(vm.event),
                foundSelected = $filter('filter')(vm.recipeList, {selectedToAdd: true}, false);
            if (foundSelected.length > 0) {
                tmpModel.recipes = foundSelected;
            }

            EventService.createOrUpdate(tmpModel).then(function (event) {
                alert('info', event.title, 'saved');
            })['catch'](function () {
                alert('warning', 'Error', 'Saving event');
            });
        };


        vm.onAddRecipe = function (index) {
            /*if (vm.recipeList && vm.recipeList.length > 0) {
                vm.recipeList = null;
                return;
            }*/
            recipeService.getRecipeListByUser({}, {sort: name}).then(function (list) {
                var found = $filter('filter')(vm.recipeList, {selectedToAdd: true}, false);
                found.forEach(function (item) {
                    EventService.removeArrayItem(list, {id: item.id});
                });
                vm.recipeList = found.concat(list);
            });
        };

        vm.onRecipeSelected = function (recipe, event) {
            event.preventDefault();

            recipe.selectedToAdd = !recipe.selectedToAdd;
            EventService.removeArrayItem(vm.event.recipes, {id: recipe.id});
        };

    }]);
}());
