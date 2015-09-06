'use strict';

describe('Controller: MyrecipesCtrl', function () {

  // load the controller's module
  beforeEach(module('foodCircle'));

  var MyrecipesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyrecipesCtrl = $controller('MyrecipesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MyrecipesCtrl.awesomeThings.length).toBe(3);
  });
});
