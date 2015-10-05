
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('userService', ['sailsResource', '$auth', '$q', '$log', function (sailsResource, $auth, $q, $log) {

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
            var dfd = $q.defer();
            sailsResource(sailsResourceName).get(createQueryDto(query), function (user) {
                dfd.resolve(user);

            }, function (error) {
                $log.error(error);
                dfd.resolve({});
            });
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
