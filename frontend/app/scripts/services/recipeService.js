
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('recipeService', ['IngredientModel', 'sailsResource', 'authService', '$log', '$q', function (IngredientModel, sailsResource, authService, $log, $q) {

        var recipeService = {},

            sailsResourceName = 'recipe',


            createDto = function (data) {
                var Resource = sailsResource(sailsResourceName),
                    RecipeDto;
                if (data.id) {
                    RecipeDto = recipeService.get({
                        where: {
                            id: data.id
                        }
                    });
                    angular.extend(RecipeDto, data);
                    RecipeDto.token = authService.getToken();
                } else {
                    RecipeDto = new Resource();
                    angular.extend(RecipeDto, data);
                    RecipeDto.token = authService.getToken();
                }

                return RecipeDto;
            },

            createQueryDto = function (query) {
                var tmpQuery = query || {};
                tmpQuery.token = authService.getToken();
                return tmpQuery;
            };

        recipeService.getRecipeList = function (query) {
            return sailsResource(sailsResourceName).query(createQueryDto(query));
        };

        recipeService.getRecipeListByUser = function (user, query) {
            //explicit where to ignore token param
            var userQuery = {
                where: {
                    recipeowner: user.id
                }
            };
            if (query) {
                angular.extend(userQuery, query);
            }
            return sailsResource(sailsResourceName).query(createQueryDto(userQuery));
        };

        recipeService.createOrUpdateRecipe = function (data, userid) {
            if (!userid) {
                $log.warn('Userid missing. Using current user id');
                userid = authService.currentUser().id;
            }
            var recipeDto = createDto(data);
            recipeDto.recipeowner = userid;
            return recipeDto.$save();
        };

        recipeService.get = function (query) {
            var dfd = $q.defer();

            sailsResource(sailsResourceName).get(createQueryDto(query),
                function (response) {
                    dfd.resolve(response);
                },
                function (response) {
                    dfd.resolve({});
                });

            return dfd.promise;
        };

        recipeService.getById = function (id) {
            if (!id) {
                $log.error('id missing');
                return [];
            }

            return recipeService.get({where: {id: id}});
        };

        recipeService.getByName = function (name) {
            if (!name) {
                $log.error('name missing');
                return [];
            }

            return recipeService.get({where: {name: name}});
        };

        return recipeService;
    }]);
}());
