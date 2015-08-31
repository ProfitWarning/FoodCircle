/**
 * @ngdoc function
 * @name foodCircle.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the foodCircle
 */
 'use strict';
/* jshint ignore:start */
 angular.module('foodCircle').controller('LoginCtrl', ['alert', '$auth', function (alert, $auth) {
  var vm = this;

  vm.submit = function () {
    $auth.login({
    			email: vm.email,
    			password: vm.password
    		}).then(function (res) {
    			var message = 'Thanks for coming back ' + res.data.user.email + '!';

    			// if (!res.data.user.active)
    			// 	message = 'Just a reminder, please activate your account soon :)';

    			alert('success', 'Welcome', message);
    		}).catch(handleError);
 	};

  function handleError(res) {
    if(res && res.data){
      alert('warning', 'Something went wrong :', res.data.err);
    }
 	}
}]);
/* jshint ignore:end */
