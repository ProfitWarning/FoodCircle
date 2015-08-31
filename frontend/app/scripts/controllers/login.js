/**
 * @ngdoc function
 * @name foodCircle.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the foodCircle
 */

'use strict';

angular.module('foodCircle').controller('LoginCtrl', ['alert', '$auth', '$state', function (alert, $auth, $state) {
    var vm = this;

    function handleError(res) {
        if (res && res.data) {
            alert('warning', 'Something went wrong :', res.data.err);
        }
    }

    vm.submit = function () {
        $auth.login({
            email: vm.email,
            password: vm.password
        }).then(function (res) {
            var message = 'Thanks for coming back ' + res.data.user.email + '!';

            // if (!res.data.user.active)
            // message = 'Just a reminder, please activate your account soon :)';

            alert('success', 'Welcome', message);
            $state.go('home');

        }).catch(handleError);
    };
}]);
