/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').factory('RecipeModel', [function () {

        var RecipeModel = function (amount, unit, name, events) {
            this.amount = amount;
            this.unit = unit;
            this.name = name;
            this.events = events || [];
        };


        RecipeModel.create = function (data) {
            data.recipes = data.recipes || [];
            return new RecipeModel(data.amount, data.unit, data.name, data.events);
        };

        return RecipeModel;
    }]);
}());
