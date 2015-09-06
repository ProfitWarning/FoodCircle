 /**
     * @ngdoc function
     * @name foodCircle.controller:RecipeCtrl
     * @description
     * # RecipeCtrl
     * Controller of the foodCircle
     */
(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipeEditorCtrl', ['recipeService', 'IngredientModel', 'alert', 'authService', function (recipeService, IngredientModel, alert, authService) {
        var vm = this;//Recipe view model

        vm.recipeEditor = {};

        vm.units = ['g', 'kg', 'El', 'Tl', 'ml', 'Liter', ''];
        vm.ingredients = [];
        vm.ingredients.push(new IngredientModel('', '', ''));

        vm.addIngredientInput = function () {
            vm.ingredients.push(new IngredientModel('', '', ''));
        };

        vm.removeIngredientInput = function () {
            vm.ingredients.pop();
        };

        vm.submit = function (event) {
            event.preventDefault();

            recipeService.createNewRecipe(vm, authService.currentUser().id).then(function () {

            }, function (error) {
                alert('error', error.message);
            });
        };

    }]);
}());
