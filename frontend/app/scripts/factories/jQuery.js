
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').factory('jQuery', ['$window', function ($window) {
        return $window.jQuery;
    }]);
}());
