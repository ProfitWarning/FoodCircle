 /**
     * @ngdoc function
     * @name foodCircle.controller:RecipeCtrl
     * @description
     * # RecipeCtrl
     * Controller of the foodCircle
     */
(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipeEditorCtrl', ['Ingredient', 'Recipe', 'alert', function (Ingredient, Recipe, alert) {
        var vm = this;//Recipe view model

        vm.recipeEditor = {};

        vm.units = ['g', 'kg', 'El', 'Tl', 'ml', 'Liter', ''];
        vm.ingredients = [];
        vm.ingredients.push(new Ingredient('', '', ''));

        vm.addIngredientInput = function () {
            vm.ingredients.push(new Ingredient('', '', ''));
        };

        vm.removeIngredientInput = function () {
            vm.ingredients.pop();
        };

        vm.submit = function (event) {
            event.preventDefault();

            Recipe.createDto(vm).$save(function () {

            }, function (error) {
                alert('error', error.message);
            });
        };

    }]);
}());
