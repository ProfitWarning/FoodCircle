/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('recipeService', ['BaseService', 'IngredientModel', 'SailsResourceService', 'authService', '$log', '$q', '$auth', '$exceptionHandler', function (BaseService, IngredientModel, SailsResourceService, authService, $log, $q, $auth, $exceptionHandler) {

        var recipeService = {},

            sailsResourceName = 'recipe',

            createDto = function (data) {
                var Resource = SailsResourceService.getResource(sailsResourceName),
                    RecipeDto;
                if (data.id) {
                    return recipeService.get({where: {id: data.id}});

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
                    $exceptionHandler(response);
                    dfd.resolve({});
                });
            return dfd.promise;
        };

        recipeService.createOrUpdateRecipe = function (data, userid) {
            if (!userid) {
                $log.warn('Userid missing. Using current user id');
                userid = authService.currentUser().id;
            }

            var dfd = $q.defer(),
                recipeDto = createDto(data);

            if (!recipeDto.then) {
                recipeDto.recipeowner = userid;

                recipeDto.$save(function (recipe) {
                    dfd.resolve(recipe);
                }, function (error) {
                    dfd.reject(error);
                    $exceptionHandler(error);
                });

            } else if (data.id) {
                recipeDto.then(function (recipeToUpdate) {
                    angular.extend(recipeToUpdate, data);
                    recipeToUpdate.recipeowner = userid;
                    recipeToUpdate.token = $auth.getToken();

                    recipeToUpdate.$save(function (recipe) {
                        dfd.resolve(recipe);
                    }, function (error) {
                        dfd.reject(error);
                        $exceptionHandler(error);
                    });
                });
            } else {
                dfd.reject({message: 'nothing found to do in data'});
            }

            return dfd.promise;
        };

        recipeService.get = function (query) {
            var dfd = $q.defer();

            SailsResourceService.getResource(sailsResourceName).get(createQueryDto(query),
                function (response) {
                    dfd.resolve(response);
                },
                function (response, ab, cd) {
                    $exceptionHandler(response);
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
            var dfd = $q.defer();
            recipeService.getById(id).then(function (recipe) {
                recipe.$delete({token: authService.getToken()}, function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    $exceptionHandler(response);
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
                    debugger;
                        $exceptionHandler(response);
                        dfd.reject({});
                    });

            }, function (response) {
                $exceptionHandler(response);
            });

            return dfd.promise;
        };

        BaseService.setPrototypeOf(recipeService, BaseService);

        return recipeService;
    }]);
}());
