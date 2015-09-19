'use strict';

describe('Controller: CarouselCtrl', function () {

  // load the controller's module
  beforeEach(module('foodCircle'));

  var CarouselCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarouselCtrl = $controller('CarouselCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CarouselCtrl.awesomeThings.length).toBe(3);
  });
});
