'use strict';

/**
 * @ngdoc function
 * @name foodCircle.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the foodCircle
 */
 'use strict';

 angular.module('foodCircle').controller('LoginCtrl',['alert', function (alert, auth, $auth) {
  var vm = this;

  vm.submit = function () {
    alert('info', 'submit');
 	};

 	vm.authenticate = function (provider) {

 	}

 	function handleError(err) {
 		alert('warning', 'Something went wrong :(', err.message);
 	}
}]);
