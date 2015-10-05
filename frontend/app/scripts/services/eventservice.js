/**
 * @ngdoc service
 * @name foodCircle.EventService
 * @description
 * # EventService
 * Service in the foodCircle.
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('EventService', ['$auth', 'sailsResource', '$log', '$q', function ($auth, sailsResource, $log, $q) {

        var EventService = {},
            sailsResourceName = 'Event',


            createQueryDto = function (query) {
                return query || {};
            },

            createDto = function (data) {
                var Resource = sailsResource(sailsResourceName),
                    EventDto;
                if (data.id) {
                    EventDto = EventService.getEventById(data.id);
                    angular.extend(EventDto, data);
                    EventDto.token = $auth.getToken();
                } else {
                    EventDto = new Resource();
                    angular.extend(EventDto, data);
                    EventDto.token = $auth.getToken();
                }

                return EventDto;
            };

        EventService.getEvent = function (query) {
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

        EventService.getEventById = function (id) {
            if (!id) {
                $log.error('Id missing');
                return [];
            }
            return EventService.getEvent({where: {id: id}});
        };

        EventService.createOrUpdate = function (data) {
            var recipeDto = createDto(data);
            return recipeDto.$save();
        };

        EventService.getEventList = function (query) {
            var dfd = $q.defer();
            sailsResource(sailsResourceName).query(createQueryDto(query), function (eventlist) {
                dfd.resolve(eventlist);

            }, function (error) {
                dfd.resolve([]);
            });

            return dfd.promise;
        };


        return EventService;

    }]);
}());
