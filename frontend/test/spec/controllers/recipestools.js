'use strict';

describe('Controller: RecipestoolsCtrl', function () {

  // load the controller's module
  beforeEach(module('foodCircle'));

  var RecipestoolsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecipestoolsCtrl = $controller('RecipestoolsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecipestoolsCtrl.awesomeThings.length).toBe(3);
  });
});
