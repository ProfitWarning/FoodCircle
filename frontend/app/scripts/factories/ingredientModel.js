
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').factory('IngredientModel', [function () {

        var IngredientModel = function (amount, unit, name) {
            this.amount = amount;
            this.unit = unit;
            this.name = name;
        };


        IngredientModel.create = function (data) {
            return new IngredientModel(data.amount, data.unit, data.name);
        };

        return IngredientModel;
    }]);
}());
