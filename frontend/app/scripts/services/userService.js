(function () {
    'use strict';

    angular.module('foodCircle').service('userService', ['sailsResource', '$auth', function (sailsResource, $auth) {

        var userService = {},

            sailsResourceName = 'User',


            /*createDto = function (data) {
                var Resource = sailsResource(sailsResourceName),
                    UserDto = new Resource();
                UserDto.name = data.name;
                UserDto.email = data.email;
                UserDto.token = $auth.getToken();

                return UserDto;
            },*/

            createQueryDto = function (query) {
                var tmpQuery = query || {};
                tmpQuery.token = $auth.getToken();
                return tmpQuery;
            };

        userService.get = function (query) {
            return sailsResource(sailsResourceName).get(createQueryDto(query));
        };

         userService.getById = function (id) {
             if (!id) {
                 return {};
             }
            return userService.get({where: {id: id}});
        };

        return userService;
    }]);
}());
