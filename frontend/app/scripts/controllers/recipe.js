 /**
     * @ngdoc function
     * @name foodCircle.controller:RecipeCtrl
     * @description
     * # RecipeCtrl
     * Controller of the foodCircle
     */
(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipeCtrl', ['Ingredient', function (Ingredient) {
        var vm = this;
        vm.units = ['g', 'kg', 'El', 'Tl', 'ml', 'Liter', ''];
        vm.ingredients = [];
        vm.ingredientsInputs = [];
        vm.ingredientsInputs.push(new Ingredient('', '', ''));

        vm.addIngredientInput = function () {
            vm.ingredientsInputs.push(new Ingredient('', '', ''));
            console.log(vm.ingredientsInputs.length);
        };

        vm.removeIngredientInput = function () {
            vm.ingredientsInputs.pop();
        };

    }]);
}());
