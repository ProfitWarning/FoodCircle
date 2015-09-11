(function () {
    'use strict';

    angular.module('foodCircle').service('recipeService', ['IngredientModel', 'sailsResource', 'authToken', function (IngredientModel, sailsResource, authToken) {

        var recipeService = {},

            sailsResourceName = 'recipe',


            createDto = function (data) {
                var Resource = sailsResource(sailsResourceName),
                    RecipeDto = new Resource();
                RecipeDto.name = data.name;
                RecipeDto.description = data.description;
                RecipeDto.ingredients = data.ingredients;
                RecipeDto.token = authToken.getToken();

                return RecipeDto;
            },

            createQueryDto = function (query) {
                var tmpQuery = query || {};
                tmpQuery.token = authToken.getToken();
                return tmpQuery;
            };

        recipeService.getFullRecipeList = function () {

            return sailsResource(sailsResourceName).query(createQueryDto());
        };

        recipeService.getRecipeListByUser = function (user) {
            return sailsResource(sailsResourceName).query(createQueryDto({recipeowner: user.id}));
        };

        recipeService.createNewRecipe = function (data, userid) {
            var recipeDto = createDto(data);
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
