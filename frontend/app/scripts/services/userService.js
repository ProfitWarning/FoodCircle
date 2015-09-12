(function () {
    'use strict';

    angular.module('foodCircle').service('userService', ['sailsResource', '$auth', function (sailsResource, $auth) {

        var userService = {},

            sailsResourceName = 'User',


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

        userService.get = function (query) {
            return sailsResource(sailsResourceName).query(createQueryDto(query));
        };

        return userService;
    }]);
}());
