/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.calendar', ['ui.router', 'mwl.calendar']).config(['$stateProvider', 'calendarConfigProvider', '$provide', function ($stateProvider, calendarConfigProvider, $provide) {

        $stateProvider
            .state('main.calendar', {
                url: '/Calendar/',
                controller: 'CalendarCtrl as vm',
                templateUrl: 'views/calendar.html'
            });

        calendarConfigProvider.setDateFormatter('moment');
        //This will display all events on a month view even if they're not in the current month. Default false.
        calendarConfigProvider.setDisplayAllMonthEvents(true);
        //This will display event end times on the month and year views. Default false.
        calendarConfigProvider.setDisplayEventEndTimes(true);


        $provide.decorator('mwlCalendarSlideBoxDirective', ['$delegate', function ($delegate) {
            var directive = $delegate[0], compile;
            delete directive.template; //the calendar uses template instead of template-url so you need to delete this
            directive.templateUrl = 'views/partials/calendar.slidebox.template.html';

            directive.scope.onRecipesLabelClick = '=';
            compile = directive.compile;

            directive.compile = function () {
               /* var link = compile.apply(this, arguments);
                debugger;
                return function (scope, element, attrs, ctrls) {
                    debugger;
                    link.apply(this, arguments);

                    element.bind('click', function () {
                        scope.$apply(function () {
                            scope.onRecipesLabelClick();
                        });
                    });
                };*/
            };

            return $delegate;
        }]);

        $provide.decorator('mwlCalendarDirective', ['$delegate', function ($delegate) {
            var directive = $delegate[0], compile;

            directive.scope.onRecipesLabelClick = '&';


            return $delegate;
        }]);

    }]);
}());

