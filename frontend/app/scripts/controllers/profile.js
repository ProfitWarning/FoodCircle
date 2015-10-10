/**
 * @ngdoc function
 * @name foodCircle.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('ProfileCtrl', ['$log', function ($log) {
        var vm = this;
        vm.eventListQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};
        vm.onEventItemClick = function (event) {
            debugger;
        };


        $log.error('created ctrl');
    }]);
}());
