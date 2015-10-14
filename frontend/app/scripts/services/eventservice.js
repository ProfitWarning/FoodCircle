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

    angular.module('foodCircle').service('EventService', ['$auth', 'SailsResourceService', '$log', '$q', 'authService', function ($auth, SailsResourceService, $log, $q, authService) {

        var EventService = {},
            sailsResourceName = 'Event',

            createQueryDto = function (query) {
                return query || {};
            },

            createDto = function (data) {
                var Resource = SailsResourceService.getResource(sailsResourceName),
                    EventDto;

                if (data.id) {
                    return EventService.getEventById(data.id);

                } else {
                    EventDto = new Resource();
                    angular.extend(EventDto, data);
                    EventDto.token = $auth.getToken();
                    return EventDto;
                }
            };

        EventService.getEvent = function (query) {
            var dfd = $q.defer();

            SailsResourceService.getResource(sailsResourceName).get(createQueryDto(query),
                function (blog) {
                    dfd.resolve(blog);
                },
                function (response) {
                    $log.error(response);
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

            var dfd = $q.defer(),
                eventDto = createDto(data);

            if (!eventDto.then) {
                eventDto.$save(function (event) {
                    dfd.resolve(event);
                }, function (error) {
                    dfd.reject(error);
                });

            } else if (data.id && data.eventowner) {
                eventDto.then(function (eventToUpdate) {
                    angular.extend(eventToUpdate, data);
                    eventToUpdate.token = $auth.getToken();

                    eventToUpdate.$save(function (event) {
                        dfd.resolve(event);
                    }, function (error) {
                        dfd.reject(error);
                    });
                });
            } else {
                dfd.reject({message: 'nothing found to do in data'});
            }

            return dfd.promise;
        };

        EventService.getEventList = function (query) {
            var dfd = $q.defer();

            SailsResourceService.getResource(sailsResourceName).query(createQueryDto(query), function (eventlist) {
                dfd.resolve(eventlist);

            }, function (error) {
                $log.error(error);
                dfd.resolve([]);
            });

            return dfd.promise;
        };

        EventService.deleteById = function (id) {
            var dfd = $q.defer();
            EventService.getEventById(id).then(function (event) {
                event.$delete({token: authService.getToken()}, function (response) {
                    $log.log(response);
                }, function (response) {
                    $log.error(response);
                    dfd.reject({});
                });
            });

            return dfd.promise;
        };


        return EventService;

    }]);
}());

