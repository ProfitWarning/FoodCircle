(function () {
    'use strict';

    angular.module('foodCircle').factory('Ingredient', [function () {

        var Ingredient = function (amount, unit, name) {
            this.amount = amount;
            this.unit = unit;
            this.name = name;
        };


        Ingredient.create = function (data) {
            return new Ingredient(data.amount, data.unit, data.name);
        };

        return Ingredient;
    }]);
}());
