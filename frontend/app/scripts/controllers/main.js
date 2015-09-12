/**
 * @ngdoc function
 * @name foodCircle.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('MainCtrl', ['recipeService', function (recipeService) {
        var vm = this,
            initRecentRecipes = function () {
                return recipeService.getRecipeList({
                    limit: 3,
                    sort: 'updatedAt DESC'
                }).$promise;
            };

        initRecentRecipes().then(function (list) {
            vm.recipeList = list;
            vm.showCreatorLink = true;
        });
    }]);
}());
