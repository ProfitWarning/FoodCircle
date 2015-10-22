
/**
 * @ngdoc service
 * @name foodCircle.BaseService
 * @description
 * # BaseService
 * Service in the foodCircle.
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').service('BaseService', ['$filter', function ($filter) {

        var BaseService = {
            removeArrayItem: function (array, queryObj) {
                var found = $filter('filter')(array, queryObj, false),
                    pos,
                    getKeyArr = function () {
                        var key, tmp = [];
                        for (key in queryObj )
                            {
                                if (queryObj.hasOwnProperty(key)) {
                                    tmp.push(key);
                                }
                            }
                        return tmp;
                    },
                    key = getKeyArr(queryObj)[0];

                if (found && found.length > 0) {
                    pos = array.map(function (e) {return e[key]; }).indexOf(found[0][key]);
                    array.splice(pos, 1);
                }
            },
            setPrototypeOf: Object.setPrototypeOf || function (o, p) {
                /*ignore jslint start*/
                o['__proto__'] = p;
                /*ignore jslint end*/
                return o;
            }
        };


        return BaseService;

    }]);
}());

