/**
 * @ngdoc service
 * @name foodCircle.BlogService
 * @description
 * # BlogService
 * Service in the foodCircle.
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('BlogService', ['$auth', 'sailsResource', '$log', '$q', function ($auth, sailsResource, $log, $q) {

        var BlogService = {},
            sailsResourceName = 'Blog',


            createQueryDto = function (query) {
                return query || {};
            },

            createDto = function (data) {
                var Resource = sailsResource(sailsResourceName),
                    BlogDto;
                if (data.id) {
                    BlogDto = BlogService.getBlogById(data.id);
                    angular.extend(BlogDto, data);
                    BlogDto.token = $auth.getToken();
                } else {
                    BlogDto = new Resource();
                    angular.extend(BlogDto, data);
                    BlogDto.token = $auth.getToken();
                }

                return BlogDto;
            };

        BlogService.getBlog = function (query) {
            var dfd = $q.defer(),
                blog;
            sailsResource(sailsResourceName).get(createQueryDto(query),
                function (blog) {
                    dfd.resolve(blog);
                },
                function (response) {
                    dfd.resolve({});
                });

            return dfd.promise;
        };

        BlogService.getBlogById = function (id) {
            if (!id) {
                $log.error('Id missing');
                return [];
            }
            return BlogService.getBlog({
                where: {
                    id: id
                }
            });
        };

        BlogService.getBlogByName = function (name) {
            if (!name) {
                $log.error('Name missing');
                return [];
            }

            return BlogService.getBlog({
                where: {
                    name: name
                }
            });
        };

        BlogService.createOrUpdate = function (data) {
            var recipeDto = createDto(data);
            return recipeDto.$save();
        };

        BlogService.getBlogList = function (query) {
            var dfd = $q.defer();
            sailsResource(sailsResourceName).query(createQueryDto(query), function (bloglist) {
                dfd.resolve(bloglist);

            }, function (error) {
                dfd.resolve([]);
            });

            return dfd.promise;
        };


        return BlogService;

    }]);
}());
