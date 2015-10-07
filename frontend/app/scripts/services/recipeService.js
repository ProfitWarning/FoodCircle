/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('recipeService', ['IngredientModel', 'SailsResourceService', 'authService', '$log', '$q', function (IngredientModel, SailsResourceService, authService, $log, $q) {

        var recipeService = {},

            sailsResourceName = 'recipe',

            createDto = function (data) {
                var Resource = SailsResourceService.getResource(sailsResourceName),
                    RecipeDto;
                if (data.id) {
                    RecipeDto = recipeService.get({
                        where: {
                            id: data.id
                        }
                    });
                    angular.extend(RecipeDto, data);
                } else {
                    RecipeDto = new Resource();
                    angular.extend(RecipeDto, data);
                }

                return RecipeDto;
            },

            createQueryDto = function (query) {
                var tmpQuery = query || {};
                return tmpQuery;
            };

        recipeService.getRecipeList = function (query) {
            return SailsResourceService.getResource(sailsResourceName).query(createQueryDto(query));
        };

        recipeService.getRecipeListByUser = function (user, query) {
            var dfd = $q.defer(),
                userQuery = {where: {recipeowner: user.id || authService.currentUser().id}};
            if (query) {
                angular.extend(userQuery, query);
            }
            SailsResourceService.getResource(sailsResourceName).query(createQueryDto(userQuery),
                function (response) {
                    dfd.resolve(response);
                },
                function (response) {
                    dfd.resolve({});
                });
            return dfd.promise;
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

            SailsResourceService.getResource(sailsResourceName).get(createQueryDto(query),
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

            return recipeService.get({
                where: {
                    id: id
                }
            });
        };

        recipeService.getByName = function (name) {
            if (!name) {
                $log.error('name missing');
                return [];
            }

            return recipeService.get({
                where: {
                    name: name
                }
            });
        };

        recipeService.deleteById = function (id) {
            var dfd = $q.defer(),
                recipe = recipeService.getById(id).then(function (recipe) {
                    recipe.$delete({token: authService.getToken()}, function (response) {
                        dfd.resolve(response);
                    }, function (response) {
                        $log.error(response);
                        dfd.reject({});
                    });
                });

            return dfd.promise;
        };

        recipeService.removeImage = function (recipe, image) {
            var dfd = $q.defer();

            SailsResourceService.getResource('Image').get({id: image.id}, function (img) {
                img.$delete({token: authService.getToken()}, function (response) {
                    dfd.resolve(response);
                },
                    function (response) {
                        dfd.reject({});
                    });

            }, function (response) {
                $log.error(response);

            });

            return dfd.promise;
        };

        return recipeService;
    }]);
}());
