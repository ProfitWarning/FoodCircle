'use strict';

describe('Controller: ListblogCtrl', function () {

  // load the controller's module
  beforeEach(module('foodCircle'));

  var ListblogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListblogCtrl = $controller('ListblogCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListblogCtrl.awesomeThings.length).toBe(3);
  });
});
