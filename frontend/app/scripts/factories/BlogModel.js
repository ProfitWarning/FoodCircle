/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').factory('RecipeModel', [function () {

        var BlogModel = function (title, summary, description) {
            this.title = title;
            this.summary = summary;
            this.description = description;
        };


        BlogModel.create = function (data) {
            return new BlogModel(data.title, data.summary, data.description);
        };

        return BlogModel;
    }]);
}());
