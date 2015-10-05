'use strict';

describe('Controller: ListeventCtrl', function () {

  // load the controller's module
  beforeEach(module('foodCircle'));

  var ListeventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListeventCtrl = $controller('ListeventCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListeventCtrl.awesomeThings.length).toBe(3);
  });
});
