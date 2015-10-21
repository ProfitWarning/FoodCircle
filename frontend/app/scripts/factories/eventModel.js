/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').factory('EventModel', ['authService', '$moment', function (authService, $moment) {

        var Eventmodel = function (title, description, date, blog, eventOwnerId, startDate, endDate, recipes) {
            this.title = title;
            this.description = description;
            this.date = $moment(date).toISOString();
            this.startDate = startDate ? $moment(startDate).toISOString() : date;
            this.endDate = endDate ? $moment(endDate).toISOString() : date;
            this.blog = blog;
            this.eventowner = eventOwnerId || authService.currentUser().id;
            this.recipes = recipes || [];
        };


        Eventmodel.create = function (data) {

            if (!data) {
                data = {
                    title: null,
                    description: null,
                    date: new Date().toISOString(),
                    blog: null,
                    eventowner: authService.currentUser().id
                };
            } else {
                data.eventowner = data.eventowner.id || authService.currentUser().id;
            }

            var newEvent = new Eventmodel(data.title, data.description, data.date, data.blog, data.eventowner, data.startDate, data.endDate, data.recipes);

            if (data.id) {
                newEvent.id = data.id;
                return newEvent;
            }

            return newEvent;
        };

        return Eventmodel;
    }]);
}());
