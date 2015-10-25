/**
 * @ngdoc function
 * @name foodCircle.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('HomeCtrl', ['recipeService', 'recipeList', 'API_URL', function (recipeService, recipeList, API_URL) {
        var vm = this;
        vm.recipeList = recipeList;
        vm.API_URL = API_URL;
    }]);
}());
