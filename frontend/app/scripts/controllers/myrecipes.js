/**
 * @ngdoc function
 * @name foodCircle.controller:MyrecipesCtrl
 * @description
 * # MyrecipesCtrl
 * Controller of the foodCircle
 */
(function () {
    'use strict';

    angular.module('foodCircle').controller('MyRecipesCtrl', ['recipeService', 'authService', 'AUTH_EVENTS', '$rootScope', function (recipeService, authService, AUTH_EVENTS, $rootScope) {
        var vm = this;
        recipeService.getRecipeListByUser(authService.currentUser()).$promise
            .then(function (item) {
                vm.recipeList = item;
            })
            .catch(function (error) {
                console.log('MyRecipesCtrl: ' + error.statusCode);
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[error.statusCode], error);
            });
    }]);
}());
