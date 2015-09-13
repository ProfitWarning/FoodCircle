(function () {
    'use strict';

    angular.module('foodCircle').service('recipeService', ['IngredientModel', 'sailsResource', '$auth', function (IngredientModel, sailsResource, $auth) {

        var recipeService = {},

            sailsResourceName = 'recipe',


            createDto = function (data) {
                var Resource = sailsResource(sailsResourceName),
                    RecipeDto = new Resource();
                RecipeDto.name = data.name;
                RecipeDto.description = data.description;
                RecipeDto.ingredients = data.ingredients;
                RecipeDto.token = $auth.getToken();

                return RecipeDto;
            },

            createQueryDto = function (query) {
                var tmpQuery = query || {};
                tmpQuery.token = $auth.getToken();
                return tmpQuery;
            };

        recipeService.getRecipeList = function (query) {
            return sailsResource(sailsResourceName).query(createQueryDto(query));
        };

        recipeService.getRecipeListByUser = function (user) {
            //explicit where to ignore token param
            return sailsResource(sailsResourceName).query(createQueryDto({where: { recipeowner: user.id}}));
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

        recipeService.get = function (query) {
            return sailsResource(sailsResourceName).get(createQueryDto(query));
        };

        return recipeService;
    }]);
}());
