/**
 * @ngdoc function
 * @name foodCircle.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('LoginCtrl', ['alert', 'authService', '$state', function (alert, authService, $state) {
        var vm = this;

        function handleError(res) {
            if (res && res.data) {
                alert('warning', 'Something went wrong :', res.data.err);
            }
        }

        vm.submit = function () {
            authService.login(vm.email, vm.password)
                .then(function () {
                    var message = 'Thanks for coming back ' + authService.currentUser().email + '!';

                    // if (!res.data.user.active)
                    // message = 'Just a reminder, please activate your account soon :)';

                    alert('success', 'Welcome', message);
                    $state.go('myrecipes.list');

                }, function (err) {
                    handleError(err);
                });
        };
    }]);
}());
