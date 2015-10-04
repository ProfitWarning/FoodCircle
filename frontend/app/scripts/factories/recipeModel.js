
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').factory('RecipeModel', [function () {

        var RecipeModel = function (amount, unit, name) {
            this.amount = amount;
            this.unit = unit;
            this.name = name;
        };


        RecipeModel.create = function (data) {
            return new RecipeModel(data.amount, data.unit, data.name);
        };

        return RecipeModel;
    }]);
}());
