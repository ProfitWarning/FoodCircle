/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').factory('EventModel', [function () {

        var Eventmodel = function (title, description, date, blog) {
            this.title = title;
            this.description = description;
            this.date = date;
            this.blog = blog;
        };


        Eventmodel.create = function (data) {
            if (!data) {
                data = {
                    title: null,
                    description: null,
                    date: new Date(),
                    blog: null
                }
            }
            return new Eventmodel(data.title, data.description, data.date.toString(), data.blog);
        };

        return Eventmodel;
    }]);
}());
