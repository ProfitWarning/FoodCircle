 /**
     * @ngdoc function
     * @name foodCircle.controller:RecipeCtrl
     * @description
     * # RecipeCtrl
     * Controller of the foodCircle
     */
(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipeEditorCtrl', ['recipeService', 'IngredientModel', 'alert', 'authService', '$state', 'recipeToEdit', function (recipeService, IngredientModel, alert, authService, $state, recipeToEdit) {
        var vm = this;
        vm.recipeEditor = {};
        vm.units = ['g', 'kg', 'El', 'Tl', 'ml', 'Liter', ''];
        vm.recipe = {};

        if (recipeToEdit) {
            vm.recipe = recipeToEdit;
        }

        if (!vm.recipe.ingredients || vm.recipe.ingredients.length === 0) {
            vm.recipe.ingredients = [];
            vm.recipe.ingredients.push(new IngredientModel('', '', ''));
        }

        vm.addIngredientInput = function () {
            vm.recipe.ingredients.push(new IngredientModel('', '', ''));
        };

        vm.removeIngredientInput = function () {
            vm.recipe.ingredients.pop();
        };

        vm.submit = function (isValidForm, event) {
            event.preventDefault();

            if (!isValidForm) {
                return;
            }

            recipeService.createOrUpdateRecipe(vm.recipe, authService.currentUser().id).then(function () {
                $state.go('myrecipes.list');
                alert('info', 'Recipe ' + (!vm.recipe.id ? 'save.' : 'updated.'));
            }, function (error) {
                alert('error', error.message);
            });
        };
    }]);
}());
