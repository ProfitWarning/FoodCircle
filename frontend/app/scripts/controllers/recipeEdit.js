 /**
 * @ngdoc function
 * @name foodCircle.controller:RecipeEditorCtrl
 * @description
 * # RecipeEditorCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipeEditorCtrl', ['recipeService', 'IngredientModel', 'alert', 'authService', '$state', 'recipeToEdit', function (recipeService, IngredientModel, alert, authService, $state, recipeToEdit) {
        /*Private*/

        /*Public*/
        var vm = this;
        vm.recipeEditor = {};
        vm.units = ['g', 'kg', 'EL', 'TL', 'ml', 'Liter', 'Prise(n)', 'kleine', 'große', 'Zehe/n', 'Bund', 'Dose', 'Spritzer', '---'];
        vm.recipe = {};

        if (recipeToEdit) {
            vm.recipe = recipeToEdit;
        }

        if (!vm.recipe.ingredients || vm.recipe.ingredients.length === 0) {
            vm.recipe.ingredients = [];
            vm.recipe.ingredients.push(new IngredientModel('', 'g', ''));
        }

        vm.addIngredientInput = function () {
            vm.recipe.ingredients.push(new IngredientModel('', 'g', ''));
        };

        vm.onRemoveIngredientInput = function (index) {
            vm.recipe.ingredients.splice(index, 1);
        };

        vm.onUnitClick = function (ingredient, unit, event) {
            event.preventDefault();
            ingredient.unit = unit;
        };

        vm.submit = function (isValidForm, event) {
            event.preventDefault();

            if (!isValidForm) {
                return;
            }

            recipeService.createOrUpdateRecipe(vm.recipe).then(function () {
                $state.go('main.myrecipes.list');
                alert('info', 'Recipe ' + (!vm.recipe.id ? 'save.' : 'updated.'));
            }, function (error) {
                alert('error', error.message);
            });
        };


    }]);
}());
