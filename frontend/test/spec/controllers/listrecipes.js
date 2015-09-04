'use strict';

describe('Controller: ListrecipesCtrl', function () {

  // load the controller's module
  beforeEach(module('foodCircle'));

  var ListrecipesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListrecipesCtrl = $controller('ListrecipesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListrecipesCtrl.awesomeThings.length).toBe(3);
  });
});
