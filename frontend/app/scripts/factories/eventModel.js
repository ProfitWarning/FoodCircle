/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').factory('EventModel', ['authService', function (authService) {

        var Eventmodel = function (title, description, date, blog, eventOwnerId) {
            this.title = title;
            this.description = description;
            this.date = date;
            this.blog = blog;
            this.eventowner = eventOwnerId || authService.currentUser().id;
        };


        Eventmodel.create = function (data) {

            if (!data) {
                data = {
                    title: null,
                    description: null,
                    date: new Date(),
                    blog: null,
                    eventowner: authService.currentUser().id
                };
            } else {
                data.eventowner = data.eventowner.id || authService.currentUser().id;
            }

            var newEvent = new Eventmodel(data.title, data.description, data.date.toString(), data.blog, data.eventowner);

            if (data.id) {
                newEvent.id = data.id;
                return newEvent;
            }

            return newEvent;
        };

        return Eventmodel;
    }]);
}());
