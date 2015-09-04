(function () {
    'use strict';

    angular.module('foodCircle').factory('Recipe', ['Ingredient', 'sailsResource', function (Ingredient, sailsResource) {

        var Recipe = function (amount, unit, name, ingredient) {
            this.name = amount;
            this.description = unit;
            this.name = name;
        },

            sailsResourceName = 'recipe';

        Recipe.createDto = function (data) {
            var Resource = sailsResource(sailsResourceName),
                RecipeDto = new Resource();
            RecipeDto.name = data.name;
            RecipeDto.description = data.description;
            RecipeDto.ingredients = data.ingredients;

            return RecipeDto;
        };

        Recipe.create = function (data) {
            var t = new Ingredient(
                data.amount,
                data.unit,
                data.name
            );
            angular.forEach(data.ingredients, function (ingr) {
                if (!t.ingredients) {
                    t.ingredients = [];
                }
                t.ingredients.push(Ingredient.create(ingr));
            });
        };

        return Recipe;
    }]);
}());
