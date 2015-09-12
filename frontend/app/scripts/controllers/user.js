'use strict';

/**
 * @ngdoc function
 * @name foodCircle.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the foodCircle
 */
(function () {
    'use strict';

    angular.module('foodCircle').controller('UserCtrl', ['userService', 'user', function (userService, user) {
        var vm = this;
        vm.user = user;
        debugger;
    }]);
}());
