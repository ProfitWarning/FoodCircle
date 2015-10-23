/**
 * @ngdoc service
 * @name foodCircle.queryService
 * @description
 * # queryService
 * Service in the foodCircle.
 */
/*global
    angular
*/


(function () {
    'use strict';

    angular.module('foodCircle').service('queryService', [function () {
        var queryService = {}, i, queryParam, queryObj = {}, obj,
            parseParamerter = function (parameter) {
                var pairs = parameter.split(',');
                /*jslint plusplus: true */
                for (i = 0; i < pairs.length; i++) {
                    queryParam = pairs[i];
                    obj = queryParam.split(':');
                    queryObj[obj[0]] = obj[1];
                }

                return queryObj;
            };

        queryService.queryFromUrlParam = function (oldQueryObj, queryString) {

            var newQueryObj = angular.fromJson(queryString);

            if (oldQueryObj.where) {
                angular.extend(oldQueryObj.where, newQueryObj);
            }
            return oldQueryObj;
        };

        return queryService;
    }]);
}());
