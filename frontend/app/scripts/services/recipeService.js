(function () {
    'use strict';

    angular.module('foodCircle').service('recipeService', ['IngredientModel', 'sailsResource', function (IngredientModel, sailsResource) {

        var recipeService = {},

            sailsResourceName = 'recipe',


            createDto = function (data) {
                var Resource = sailsResource(sailsResourceName),
                    RecipeDto = new Resource();
                RecipeDto.name = data.name;
                RecipeDto.description = data.description;
                RecipeDto.ingredients = data.ingredients;

                return RecipeDto;
            };


        recipeService.getFullRecipeList = function () {

            return sailsResource(sailsResourceName).query();
        };

        recipeService.getRecipeListByUser = function (user) {
            return sailsResource(sailsResourceName).query({recipeowner: user.id});
        };

        recipeService.createNewRecipe = function (data, userid) {
            var recipeDto = createDto(data);
            console.log('[createNewRecipe]: userid: ' + userid);
            recipeDto.recipeowner = userid;
            return recipeDto.$save();
        };

        recipeService.updateRecipe = function (data, userid) {
            var recipeDto = createDto(data);
            recipeDto.recipeowner = userid;
            return recipeDto.$save();
        };

        return recipeService;
    }]);
}());
