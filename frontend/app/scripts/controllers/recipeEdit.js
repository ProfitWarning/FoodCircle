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
        var vm = this;//Recipe view model

        vm.recipeEditor = {};
        vm.units = ['g', 'kg', 'El', 'Tl', 'ml', 'Liter', ''];
        vm.ingredients = [];
        vm.ingredients.push(new IngredientModel('', '', ''));
        if(recipeToEdit) {
            vm.recipe = recipeToEdit;
            debugger;
        }


        vm.addIngredientInput = function () {
            vm.ingredients.push(new IngredientModel('', '', ''));
        };

        vm.removeIngredientInput = function () {
            vm.ingredients.pop();
        };

        vm.submit = function (isValidForm, event) {
            if (!isValidForm) {
                return;
            }
            event.preventDefault();

            recipeService.createOrUpdateRecipe(vm.recipe, authService.currentUser().id).then(function () {
                $state.go('myrecipes.list');
                alert('info', 'Recipe updated.');
            }, function (error) {
                alert('error', error.message);
            });
        };
    }]);
}());
